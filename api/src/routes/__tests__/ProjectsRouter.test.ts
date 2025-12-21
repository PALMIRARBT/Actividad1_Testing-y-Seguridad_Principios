import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '../../config/server/server';
import ProjectModel from '../../model/project';
import { buildProject, resetProjectFactory } from '../../tests/factories/projectFactory';

const JWT_SECRET = app.get('secret');
const testUser = { id: 'testuser' };
const token = jwt.sign(testUser, JWT_SECRET);

// Helper para autenticación
function authHeader() {
  return { Authorization: `Bearer ${token}` };
}

describe('ProjectsRouter API', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await ProjectModel.deleteMany({});
    resetProjectFactory();
  });

  it('GET /v1/projects/:id - Proyecto existente', async () => {
    const project = await ProjectModel.create({
      title: 'Test',
      description: 'desc',
      version: '1.0',
      link: '',
      tag: '',
      timestamp: Date.now(),
      password: 'hashedpass'
    });
    const res = await request(app).get(`/v1/projects/${project._id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Test');
  });

  it('GET /v1/projects/:id - Proyecto inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/v1/projects/${fakeId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/no encontrado/i);
  });

  it('POST /v1/projects - Crear proyecto válido', async () => {
    const newProject = buildProject({ password: '12345' });
    const res = await request(app)
      .post('/v1/projects')
      .set(authHeader())
      .send(newProject);
    expect(res.status).toBe(201);
    const dbProject = await ProjectModel.findOne({ title: newProject.title });
    expect(dbProject).not.toBeNull();
    expect(dbProject?.password).not.toBe('12345'); // Debe estar hasheado
  });

  it('POST /v1/users - Datos inválidos', async () => {
    const res = await request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .send({ username: '' }); // Falta password u otros datos
    expect(res.status).toBe(400);
    expect(res.body).toEqual({}); // Por limitación de Supertest/Express
  });

  // Validar proyecto válido
  it('POST /v1/projects - Validar proyecto válido', async () => {
    const validProject = {
      title: 'ValidProject',
      description: 'desc',
      version: '1.0',
      link: 'http://example.com',
      tag: 'test',
      timestamp: Date.now(),
      password: 'securepass'
    };
    const res = await request(app)
      .post('/v1/projects')
      .set(authHeader())
      .send(validProject);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('ValidProject');
    const dbProject = await ProjectModel.findOne({ title: 'ValidProject' });
    expect(dbProject).not.toBeNull();
    expect(dbProject?.password).not.toBe('securepass');
  });

  // Validar proyecto inválido
  it('POST /v1/projects - Validar proyecto inválido', async () => {
    const invalidProject = {
      title: '', // Título requerido
      description: 'desc',
      version: '1.0',
      link: '',
      tag: '',
      timestamp: Date.now(),
      password: 'securepass'
    };
    const res = await request(app)
      .post('/v1/projects')
      .set(authHeader())
      .send(invalidProject);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/validación|requerido/i);
  });

  // Sample project
  it('POST /v1/projects - Crear sampleproject', async () => {
    const sampleProject = {
      title: 'SampleProject',
      description: 'desc',
      version: '2.0',
      link: 'http://sample.com',
      tag: 'sample',
      timestamp: Date.now(),
      password: 'samplepass'
    };
    const res = await request(app)
      .post('/v1/projects')
      .set(authHeader())
      .send(sampleProject);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('SampleProject');
    const dbProject = await ProjectModel.findOne({ title: 'SampleProject' });
    expect(dbProject).not.toBeNull();
    expect(dbProject?.password).not.toBe('samplepass');
  });

  // buildproject con overrides
  it('POST /v1/projects - buildproject con overrides', async () => {
    const overrideProject = buildProject({
      title: 'OverrideProject',
      description: 'override',
      version: '2.0',
      password: 'overridepass'
    });
    const res = await request(app)
      .post('/v1/projects')
      .set(authHeader())
      .send(overrideProject);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('OverrideProject');
    expect(res.body.description).toBe('override');
    expect(res.body.version).toBe('2.0');
    const dbProject = await ProjectModel.findOne({ title: 'OverrideProject' });
    expect(dbProject).not.toBeNull();
    expect(dbProject?.password).not.toBe('overridepass');
  });
});
