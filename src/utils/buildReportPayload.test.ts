import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildReportPayload } from './buildReportPayload.js';
import type { FlatResult } from './gatherResults';
import type { EmpresaInfo } from '../types/report';

test('counts rows with actual results for each form', () => {
  const empresa: EmpresaInfo = { id: '1', nombre: 'Empresa', nit: '', logoUrl: '' };
  const flat: FlatResult[] = [
    {
      Empresa: 'Empresa',
      Sexo: 'F',
      'PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma A (puntaje transformado)': 10,
    },
    {
      Empresa: 'Empresa',
      Sexo: 'M',
      'PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma B (puntaje transformado)': 15,
    },
    {
      Empresa: 'Empresa',
      Sexo: 'M',
      'PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial extralaboral (puntaje transformado)': 20,
    },
    {
      Empresa: 'Empresa',
      Sexo: 'F',
      'PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma A (puntaje transformado)': '',
    },
  ];

  const payload = buildReportPayload({
    empresa,
    flat,
    resumenA: undefined,
    resumenB: undefined,
    resumenExtra: undefined,
    estresGlobal: null,
  });

  assert.equal(payload.muestra.total, 4);
  assert.equal(payload.muestra.formaA, 1);
  assert.equal(payload.muestra.formaB, 1);
  assert.equal(payload.muestra.extralaboral, 1);
});
