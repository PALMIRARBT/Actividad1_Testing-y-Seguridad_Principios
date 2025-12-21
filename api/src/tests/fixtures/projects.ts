// api/src/tests/fixtures/projects.ts

export const validProject = {
  title: 'Proyecto Válido',
  description: 'Descripción de proyecto válido',
  version: '1.0',
  link: 'https://example.com',
  tag: 'test',
  timestamp: Date.now(),
  password: 'securepass123'
};

export const invalidProjects = {
  noTitle: {
    // title missing
    description: 'Sin título',
    version: '1.0',
    link: 'https://example.com',
    tag: 'test',
    timestamp: Date.now(),
    password: 'securepass123'
  },
  noDescription: {
    title: 'Sin descripción',
    // description missing
    version: '1.0',
    link: 'https://example.com',
    tag: 'test',
    timestamp: Date.now(),
    password: 'securepass123'
  },
  emptyFields: {
    title: '',
    description: '',
    version: '',
    link: '',
    tag: '',
    timestamp: '',
    password: ''
  },
  wrongType: {
    title: 123,
    description: {},
    version: [],
    link: false,
    tag: null,
    timestamp: 'not-a-date',
    password: 12345
  }
};

export const sampleProjects = [
  {
    title: 'Proyecto Alpha',
    description: 'Primer proyecto de ejemplo',
    version: '1.0',
    link: 'https://alpha.com',
    tag: 'alpha',
    timestamp: Date.now(),
    password: 'alpha123'
  },
  {
    title: 'Proyecto Beta',
    description: 'Segundo proyecto de ejemplo',
    version: '2.0',
    link: 'https://beta.com',
    tag: 'beta',
    timestamp: Date.now(),
    password: 'beta123'
  },
  {
    title: 'Proyecto Gamma',
    description: 'Tercer proyecto de ejemplo',
    version: '3.0',
    link: 'https://gamma.com',
    tag: 'gamma',
    timestamp: Date.now(),
    password: 'gamma123'
  }
];
