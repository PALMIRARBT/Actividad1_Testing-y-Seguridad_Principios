// api/src/tests/factories/projectFactory.ts

let projectIdCounter = 1;

export function buildProject(overrides = {}) {
  const id = projectIdCounter++;
  const base = {
    title: `Proyecto ${id}`,
    description: `Descripción del proyecto ${id}`,
    version: '1.0',
    link: `https://proyecto${id}.com`,
    tag: `tag${id}`,
    timestamp: Date.now(),
    password: `pass${id}`
  };
  return { ...base, ...overrides };
}

export function buildProjects(count = 3) {
  return Array.from({ length: count }, () => buildProject());
}

export function resetProjectFactory() {
  projectIdCounter = 1;
}
