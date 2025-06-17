// src/data/esquemaPuntuacion.ts

export type PreguntaEsquema = {
  numero: number;
  texto: string;
  dominio: string;
  dimension?: string;
  categoria?: string;
};

export const esquemaFormaA: PreguntaEsquema[] = [
  // 1-12: Ambiente de trabajo / Condiciones ambientales
  { numero: 1, texto: "El ruido en el lugar donde trabajo es molesto", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 2, texto: "En el lugar donde trabajo hace mucho frío", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 3, texto: "En el lugar donde trabajo hace mucho calor", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 4, texto: "El aire en el lugar donde trabajo es fresco y agradable", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 5, texto: "La luz del sitio donde trabajo es agradable", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 6, texto: "El espacio donde trabajo es cómodo", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 7, texto: "En mi trabajo me preocupa estar expuesto a sustancias químicas que afecten mi salud", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 8, texto: "Mi trabajo me exige hacer mucho esfuerzo físico", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 9, texto: "Los equipos o herramientas con los que trabajo son cómodos", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 10, texto: "En mi trabajo me preocupa estar expuesto a microbios, animales o plantas que afecten mi salud", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 11, texto: "Me preocupa accidentarme en mi trabajo", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },
  { numero: 12, texto: "El lugar donde trabajo es limpio y ordenado", dominio: "Ambiente de trabajo", dimension: "Condiciones ambientales" },

  // 13-15: Carga de trabajo / Cantidad de trabajo
  { numero: 13, texto: "Por la cantidad de trabajo que tengo debo quedarme tiempo adicional", dominio: "Carga de trabajo", dimension: "Cantidad de trabajo" },
  { numero: 14, texto: "Me alcanza el tiempo de trabajo para tener al día mis deberes", dominio: "Carga de trabajo", dimension: "Cantidad de trabajo" },
  { numero: 15, texto: "Por la cantidad de trabajo que tengo debo trabajar sin parar", dominio: "Carga de trabajo", dimension: "Cantidad de trabajo" },

  // 16-21: Carga de trabajo / Exigencia mental
  { numero: 16, texto: "Mi trabajo me exige hacer mucho esfuerzo mental", dominio: "Carga de trabajo", dimension: "Exigencia mental" },
  { numero: 17, texto: "Mi trabajo me exige estar muy concentrado", dominio: "Carga de trabajo", dimension: "Exigencia mental" },
  { numero: 18, texto: "Mi trabajo me exige memorizar mucha información", dominio: "Carga de trabajo", dimension: "Exigencia mental" },
  { numero: 19, texto: "En mi trabajo tengo que tomar decisiones difíciles muy rápido", dominio: "Carga de trabajo", dimension: "Exigencia mental" },
  { numero: 20, texto: "Mi trabajo me exige atender a muchos asuntos al mismo tiempo", dominio: "Carga de trabajo", dimension: "Exigencia mental" },
  { numero: 21, texto: "Mi trabajo requiere que me fije en pequeños detalles", dominio: "Carga de trabajo", dimension: "Exigencia mental" },

  // 22-30: Responsabilidad del cargo
  { numero: 22, texto: "En mi trabajo respondo por cosas de mucho valor", dominio: "Responsabilidad del cargo", dimension: "Responsabilidad del cargo" },
  { numero: 23, texto: "En mi trabajo respondo por dinero de la empresa", dominio: "Responsabilidad del cargo", dimension: "Responsabilidad del cargo" },
  { numero: 24, texto: "Como parte de mis funciones debo responder por la seguridad de otros", dominio: "Responsabilidad del cargo", dimension: "Responsabilidad del cargo" },
  { numero: 25, texto: "Respondo ante mi jefe por los resultados de toda mi área de trabajo", dominio: "Responsabilidad del cargo", dimension: "Responsabilidad del cargo" },
  { numero: 26, texto: "Mi trabajo me exige cuidar la salud de otras personas", dominio: "Responsabilidad del cargo", dimension: "Responsabilidad del cargo" },
  { numero: 27, texto: "En el trabajo me dan órdenes contradictorias", dominio: "Responsabilidad del cargo", dimension: "Responsabilidad del cargo" },
  { numero: 28, texto: "En mi trabajo me piden hacer cosas innecesarias", dominio: "Responsabilidad del cargo", dimension: "Responsabilidad del cargo" },
  { numero: 29, texto: "En mi trabajo se presentan situaciones en las que debo pasar por alto normas o procedimientos", dominio: "Responsabilidad del cargo", dimension: "Responsabilidad del cargo" },
  { numero: 30, texto: "En mi trabajo tengo que hacer cosas que se podrían hacer de una forma más práctica", dominio: "Responsabilidad del cargo", dimension: "Responsabilidad del cargo" },

  // 31-38: Jornada de trabajo
  { numero: 31, texto: "Trabajo en horarios de noche", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 32, texto: "En mi trabajo es posible tomar pausas para descansar", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 33, texto: "Mi trabajo me exige laborar en días de descanso, festivos o fines de semana", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 34, texto: "En mi trabajo puedo tomar fines de semana o días de descanso al mes", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 35, texto: "Cuando estoy en casa sigo pensando en el trabajo", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 36, texto: "Discuto con mi familia o amigos por causa de mi trabajo", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 37, texto: "Debo atender asuntos de trabajo cuando estoy en casa", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 38, texto: "Por mi trabajo el tiempo que paso con mi familia y amigos es muy poco", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },

  // 39-47: Habilidades y competencias
  { numero: 39, texto: "Mi trabajo me permite desarrollar mis habilidades", dominio: "Habilidades y competencias", dimension: "Habilidades y competencias" },
  { numero: 40, texto: "Mi trabajo me permite aplicar mis conocimientos", dominio: "Habilidades y competencias", dimension: "Habilidades y competencias" },
  { numero: 41, texto: "Mi trabajo me permite aprender nuevas cosas", dominio: "Habilidades y competencias", dimension: "Habilidades y competencias" },
  { numero: 42, texto: "Me asignan el trabajo teniendo en cuenta mis capacidades", dominio: "Habilidades y competencias", dimension: "Habilidades y competencias" },
  { numero: 43, texto: "Puedo tomar pausas cuando las necesito", dominio: "Habilidades y competencias", dimension: "Habilidades y competencias" },
  { numero: 44, texto: "Puedo decidir cuánto trabajo hago en el día", dominio: "Habilidades y competencias", dimension: "Habilidades y competencias" },
  { numero: 45, texto: "Puedo decidir la velocidad a la que trabajo", dominio: "Habilidades y competencias", dimension: "Habilidades y competencias" },
  { numero: 46, texto: "Puedo cambiar el orden de las actividades en mi trabajo", dominio: "Habilidades y competencias", dimension: "Habilidades y competencias" },
  { numero: 47, texto: "Puedo parar un momento mi trabajo para atender algún asunto personal", dominio: "Habilidades y competencias", dimension: "Habilidades y competencias" },

  // 48-52: Cambios en el trabajo
  { numero: 48, texto: "Los cambios en mi trabajo han sido beneficiosos", dominio: "Cambios en el trabajo", dimension: "Cambios en el trabajo" },
  { numero: 49, texto: "Me explican claramente los cambios que ocurren en mi trabajo", dominio: "Cambios en el trabajo", dimension: "Cambios en el trabajo" },
  { numero: 50, texto: "Puedo dar sugerencias sobre los cambios que ocurren en mi trabajo", dominio: "Cambios en el trabajo", dimension: "Cambios en el trabajo" },
  { numero: 51, texto: "Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas y sugerencias", dominio: "Cambios en el trabajo", dimension: "Cambios en el trabajo" },
  { numero: 52, texto: "Los cambios que se presentan en mi trabajo dificultan mi labor", dominio: "Cambios en el trabajo", dimension: "Cambios en el trabajo" },

  // 53-59: Claridad de rol
  { numero: 53, texto: "Me informan con claridad cuáles son mis funciones", dominio: "Claridad de rol", dimension: "Claridad de rol" },
  { numero: 54, texto: "Me informan cuáles son las decisiones que puedo tomar en mi trabajo", dominio: "Claridad de rol", dimension: "Claridad de rol" },
  { numero: 55, texto: "Me explican claramente los resultados que debo lograr en mi trabajo", dominio: "Claridad de rol", dimension: "Claridad de rol" },
  { numero: 56, texto: "Me explican claramente el efecto de mi trabajo en la empresa", dominio: "Claridad de rol", dimension: "Claridad de rol" },
  { numero: 57, texto: "Me explican claramente los objetivos de mi trabajo", dominio: "Claridad de rol", dimension: "Claridad de rol" },
  { numero: 58, texto: "Me informan claramente quién me puede orientar para hacer mi trabajo", dominio: "Claridad de rol", dimension: "Claridad de rol" },
  { numero: 59, texto: "Me informan claramente con quién puedo resolver los asuntos de trabajo", dominio: "Claridad de rol", dimension: "Claridad de rol" },

  // 60-62: Capacitación
  { numero: 60, texto: "La empresa me permite asistir a capacitaciones relacionadas con mi trabajo", dominio: "Capacitación", dimension: "Capacitación" },
  { numero: 61, texto: "Recibo capacitación útil para hacer mi trabajo", dominio: "Capacitación", dimension: "Capacitación" },
  { numero: 62, texto: "Recibo capacitación que me ayuda a hacer mejor mi trabajo", dominio: "Capacitación", dimension: "Capacitación" },

  // 63-75: Liderazgo y relaciones con jefes
  { numero: 63, texto: "Mi jefe me da instrucciones claras", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 64, texto: "Mi jefe ayuda a organizar mejor el trabajo", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 65, texto: "Mi jefe tiene en cuenta mis puntos de vista y opiniones", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 66, texto: "Mi jefe me anima para hacer mejor mi trabajo", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 67, texto: "Mi jefe distribuye las tareas de forma que me facilita el trabajo", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 68, texto: "Mi jefe me comunica a tiempo la información relacionada con el trabajo", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 69, texto: "La orientación que me da mi jefe me ayuda a hacer mejor el trabajo", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 70, texto: "Mi jefe me ayuda a progresar en el trabajo", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 71, texto: "Mi jefe me ayuda a sentirme bien en el trabajo", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 72, texto: "Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 73, texto: "Siento que puedo confiar en mi jefe", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 74, texto: "Mi jefe me escucha cuando tengo problemas de trabajo", dominio: "Liderazgo", dimension: "Relación con jefes" },
  { numero: 75, texto: "Mi jefe me brinda su apoyo cuando lo necesito", dominio: "Liderazgo", dimension: "Relación con jefes" },

  // 76-89: Relaciones con compañeros y apoyo social
  { numero: 76, texto: "Me agrada el ambiente de mi grupo de trabajo", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 77, texto: "En mi grupo de trabajo me tratan de forma respetuosa", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 78, texto: "Siento que puedo confiar en mis compañeros de trabajo", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 79, texto: "Me siento a gusto con mis compañeros de trabajo", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 80, texto: "En mi grupo de trabajo algunas personas me maltratan", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 81, texto: "Entre compañeros solucionamos los problemas de forma respetuosa", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 82, texto: "Hay integración en mi grupo de trabajo", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 83, texto: "Mi grupo de trabajo es muy unido", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 84, texto: "Las personas en mi trabajo me hacen sentir parte del grupo", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 85, texto: "Cuando tenemos que realizar trabajo de grupo los compañeros colaboran", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 86, texto: "Es fácil poner de acuerdo al grupo para hacer el trabajo", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 87, texto: "Mis compañeros de trabajo me ayudan cuando tengo dificultades", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 88, texto: "En mi trabajo las personas nos apoyamos unos a otros", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },
  { numero: 89, texto: "Algunos compañeros de trabajo me escuchan cuando tengo problemas", dominio: "Relaciones sociales", dimension: "Relaciones con compañeros" },

  // 90-94: Retroalimentación
  { numero: 90, texto: "Me informan sobre lo que hago bien en mi trabajo", dominio: "Retroalimentación", dimension: "Retroalimentación" },
  { numero: 91, texto: "Me informan sobre lo que debo mejorar en mi trabajo", dominio: "Retroalimentación", dimension: "Retroalimentación" },
  { numero: 92, texto: "La información que recibo sobre mi rendimiento en el trabajo es clara", dominio: "Retroalimentación", dimension: "Retroalimentación" },
  { numero: 93, texto: "La forma como evalúan mi trabajo en la empresa me ayuda a mejorar", dominio: "Retroalimentación", dimension: "Retroalimentación" },
  { numero: 94, texto: "Me informan a tiempo sobre lo que debo mejorar en el trabajo", dominio: "Retroalimentación", dimension: "Retroalimentación" },

  // 95-105: Satisfacción y reconocimiento
  { numero: 95, texto: "En la empresa confían en mi trabajo", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 96, texto: "En la empresa me pagan a tiempo mi salario", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 97, texto: "El pago que recibo es el que me ofreció la empresa", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 98, texto: "El pago que recibo es el que merezco por el trabajo que realizo", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 99, texto: "En mi trabajo tengo posibilidades de progresar", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 100, texto: "Las personas que hacen bien el trabajo pueden progresar en la empresa", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 101, texto: "La empresa se preocupa por el bienestar de los trabajadores", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 102, texto: "Mi trabajo en la empresa es estable", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 103, texto: "El trabajo que hago me hace sentir bien", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 104, texto: "Siento orgullo de trabajar en esta empresa", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 105, texto: "Hablo bien de la empresa con otras personas", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  // F1 (Pregunta filtro: no tiene dominio/dimensión, pero la incluimos para el flujo)
  { numero: 106, texto: "En mi trabajo debo brindar servicio a clientes o usuarios?", dominio: "Filtro", dimension: "Filtro", categoria: "F1" },
  // 107-115: Atención a usuarios/clientes (condicional F1 = sí)
  { numero: 107, texto: "Atiendo clientes o usuarios muy enojados", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 108, texto: "Atiendo clientes o usuarios muy preocupados", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 109, texto: "Atiendo clientes o usuarios muy tristes", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 110, texto: "Mi trabajo me exige atender personas muy enfermas", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 111, texto: "Mi trabajo me exige atender personas muy necesitadas de ayuda", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 112, texto: "Atiendo clientes o usuarios que me maltratan", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 113, texto: "Para hacer mi trabajo debo demostrar sentimientos distintos a los míos", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 114, texto: "Mi trabajo me exige atender situaciones de violencia", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 115, texto: "Mi trabajo me exige atender situaciones muy tristes o dolorosas", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },

  // F2 (Pregunta filtro: no tiene dominio/dimensión, pero la incluimos para el flujo)
  { numero: 116, texto: "Soy jefe de otras personas en mi trabajo?", dominio: "Filtro", dimension: "Filtro", categoria: "F2" },

  // 117-125: Liderazgo de equipo (condicional F2 = sí)
  { numero: 117, texto: "Tengo colaboradores que comunican tarde los asuntos de trabajo", dominio: "Liderazgo de equipo", dimension: "Liderazgo de equipo" },
  { numero: 118, texto: "Tengo colaboradores que tienen comportamientos irrespetuosos", dominio: "Liderazgo de equipo", dimension: "Liderazgo de equipo" },
  { numero: 119, texto: "Tengo colaboradores que dificultan la organización del trabajo", dominio: "Liderazgo de equipo", dimension: "Liderazgo de equipo" },
  { numero: 120, texto: "Tengo colaboradores que guardan silencio cuando les piden opiniones", dominio: "Liderazgo de equipo", dimension: "Liderazgo de equipo" },
  { numero: 121, texto: "Tengo colaboradores que dificultan el logro de los resultados del trabajo", dominio: "Liderazgo de equipo", dimension: "Liderazgo de equipo" },
  { numero: 122, texto: "Tengo colaboradores que expresan de forma irrespetuosa sus desacuerdos", dominio: "Liderazgo de equipo", dimension: "Liderazgo de equipo" },
  { numero: 123, texto: "Tengo colaboradores que cooperan poco cuando se necesita", dominio: "Liderazgo de equipo", dimension: "Liderazgo de equipo" },
  { numero: 124, texto: "Tengo colaboradores que me preocupan por su desempeño", dominio: "Liderazgo de equipo", dimension: "Liderazgo de equipo" },
  { numero: 125, texto: "Tengo colaboradores que ignoran las sugerencias para mejorar su trabajo", dominio: "Liderazgo de equipo", dimension: "Liderazgo de equipo" }
];
export const esquemaFormaB = [
  // 1-12: Condiciones ambientales
  { numero: 1, texto: "El ruido en el lugar donde trabajo es molesto", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 2, texto: "En el lugar donde trabajo hace mucho frío", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 3, texto: "En el lugar donde trabajo hace mucho calor", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 4, texto: "El aire en el lugar donde trabajo es fresco y agradable", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 5, texto: "La luz del sitio donde trabajo es agradable", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 6, texto: "El espacio donde trabajo es cómodo", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 7, texto: "En mi trabajo me preocupa estar expuesto a sustancias químicas que afecten mi salud", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 8, texto: "Mi trabajo me exige hacer mucho esfuerzo físico", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 9, texto: "Los equipos o herramientas con los que trabajo son cómodos", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 10, texto: "En mi trabajo me preocupa estar expuesto a microbios, animales o plantas que afecten mi salud", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 11, texto: "Me preocupa accidentarme en mi trabajo", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },
  { numero: 12, texto: "El lugar donde trabajo es limpio y ordenado", dominio: "Condiciones ambientales", dimension: "Condiciones ambientales" },

  // 13-15: Cantidad de trabajo
  { numero: 13, texto: "Por la cantidad de trabajo que tengo debo quedarme tiempo adicional", dominio: "Carga de trabajo", dimension: "Cantidad de trabajo" },
  { numero: 14, texto: "Me alcanza el tiempo de trabajo para tener al día mis deberes", dominio: "Carga de trabajo", dimension: "Cantidad de trabajo" },
  { numero: 15, texto: "Por la cantidad de trabajo que tengo debo trabajar sin parar", dominio: "Carga de trabajo", dimension: "Cantidad de trabajo" },

  // 16-20: Exigencias mentales
  { numero: 16, texto: "Mi trabajo me exige hacer mucho esfuerzo mental", dominio: "Carga de trabajo", dimension: "Exigencias mentales" },
  { numero: 17, texto: "Mi trabajo me exige estar muy concentrado", dominio: "Carga de trabajo", dimension: "Exigencias mentales" },
  { numero: 18, texto: "Mi trabajo me exige memorizar mucha información", dominio: "Carga de trabajo", dimension: "Exigencias mentales" },
  { numero: 19, texto: "En mi trabajo tengo que hacer cálculos matemáticos", dominio: "Carga de trabajo", dimension: "Exigencias mentales" },
  { numero: 20, texto: "Mi trabajo requiere que me fije en pequeños detalles", dominio: "Carga de trabajo", dimension: "Exigencias mentales" },

  // 21-28: Jornada de trabajo
  { numero: 21, texto: "Trabajo en horario de noche", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 22, texto: "En mi trabajo es posible tomar pausas para descansar", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 23, texto: "Mi trabajo me exige laborar en días de descanso, festivos o fines de semana", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 24, texto: "En mi trabajo puedo tomar fines de semana o días de descanso al mes", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 25, texto: "Cuando estoy en casa sigo pensando en el trabajo", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 26, texto: "Discuto con mi familia o amigos por causa de mi trabajo", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 27, texto: "Debo atender asuntos de trabajo cuando estoy en casa", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },
  { numero: 28, texto: "Por mi trabajo el tiempo que paso con mi familia y amigos es muy poco", dominio: "Jornada de trabajo", dimension: "Jornada de trabajo" },

  // 29-37: Habilidades y desarrollo personal
  { numero: 29, texto: "En mi trabajo puedo hacer cosas nuevas", dominio: "Desarrollo personal", dimension: "Habilidades y desarrollo personal" },
  { numero: 30, texto: "Mi trabajo me permite desarrollar mis habilidades", dominio: "Desarrollo personal", dimension: "Habilidades y desarrollo personal" },
  { numero: 31, texto: "Mi trabajo me permite aplicar mis conocimientos", dominio: "Desarrollo personal", dimension: "Habilidades y desarrollo personal" },
  { numero: 32, texto: "Mi trabajo me permite aprender nuevas cosas", dominio: "Desarrollo personal", dimension: "Habilidades y desarrollo personal" },
  { numero: 33, texto: "Puedo tomar pausas cuando las necesito", dominio: "Desarrollo personal", dimension: "Habilidades y desarrollo personal" },
  { numero: 34, texto: "Puedo decidir cuanto trabajo hago en el día", dominio: "Desarrollo personal", dimension: "Habilidades y desarrollo personal" },
  { numero: 35, texto: "Puedo decidir la velocidad a la que trabajo", dominio: "Desarrollo personal", dimension: "Habilidades y desarrollo personal" },
  { numero: 36, texto: "Puedo cambiar el orden de las actividades en mi trabajo", dominio: "Desarrollo personal", dimension: "Habilidades y desarrollo personal" },
  { numero: 37, texto: "Puedo parar un momento mi trabajo para atender algún asunto personal", dominio: "Desarrollo personal", dimension: "Habilidades y desarrollo personal" },

  // 38-40: Cambios en el trabajo
  { numero: 38, texto: "Me explican claramente los cambios que ocurren en mi trabajo", dominio: "Cambios", dimension: "Cambios en el trabajo" },
  { numero: 39, texto: "Puedo dar sugerencias sobre los cambios que ocurren en mi trabajo", dominio: "Cambios", dimension: "Cambios en el trabajo" },
  { numero: 40, texto: "Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas y sugerencias", dominio: "Cambios", dimension: "Cambios en el trabajo" },

  // 41-45: Claridad de funciones
  { numero: 41, texto: "Me informan con claridad cuáles son mis funciones", dominio: "Claridad de funciones", dimension: "Claridad de funciones" },
  { numero: 42, texto: "Me informan cuáles son las decisiones que puedo tomar en mi trabajo", dominio: "Claridad de funciones", dimension: "Claridad de funciones" },
  { numero: 43, texto: "Me explican claramente los resultados que debo lograr en mi trabajo", dominio: "Claridad de funciones", dimension: "Claridad de funciones" },
  { numero: 44, texto: "Me explican claramente los objetivos de mi trabajo", dominio: "Claridad de funciones", dimension: "Claridad de funciones" },
  { numero: 45, texto: "Me informan claramente con quien puedo resolver los asuntos del trabajo", dominio: "Claridad de funciones", dimension: "Claridad de funciones" },

  // 46-48: Capacitación
  { numero: 46, texto: "La empresa me permite asistir a capacitaciones relacionadas con mi trabajo", dominio: "Capacitación", dimension: "Capacitación" },
  { numero: 47, texto: "Recibo capacitación útil para hacer mi trabajo", dominio: "Capacitación", dimension: "Capacitación" },
  { numero: 48, texto: "Recibo capacitación que me ayuda a hacer mejor mi trabajo", dominio: "Capacitación", dimension: "Capacitación" },

  // 49-61: Jefatura
  { numero: 49, texto: "Mi jefe ayuda a organizar mejor el trabajo", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 50, texto: "Mi jefe tiene en cuenta mis puntos de vista y opiniones", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 51, texto: "Mi jefe me anima para hacer mejor mi trabajo", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 52, texto: "Mi jefe distribuye las tareas de forma que me facilita el trabajo", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 53, texto: "Mi jefe me comunica a tiempo la información relacionada con el trabajo", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 54, texto: "La orientación que me da mi jefe me ayuda a hacer mejor el trabajo", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 55, texto: "Mi jefe me ayuda a progresar en el trabajo", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 56, texto: "Mi jefe me ayuda a sentirme bien en el trabajo", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 57, texto: "Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 58, texto: "Mi jefe me trata con respeto", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 59, texto: "Siento que puedo confiar en mi jefe", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 60, texto: "Mi jefe me escucha cuando tengo problemas de trabajo", dominio: "Jefatura", dimension: "Jefatura" },
  { numero: 61, texto: "Mi jefe me brinda su apoyo cuando lo necesito", dominio: "Jefatura", dimension: "Jefatura" },

  // 62-73: Relaciones interpersonales
  { numero: 62, texto: "Me agrada el ambiente de mi grupo de trabajo", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 63, texto: "En mi grupo de trabajo me tratan de forma respetuosa", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 64, texto: "Siento que puedo confiar en mis compañeros de trabajo", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 65, texto: "Me siento a gusto con mis compañeros de trabajo", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 66, texto: "En mi grupo de trabajo algunas personas me maltratan", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 67, texto: "Entre compañeros solucionamos los problemas de forma respetuosa", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 68, texto: "Mi grupo de trabajo es muy unido", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 69, texto: "Cuando tenemos que realizar trabajo de grupo los compañeros colaboran", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 70, texto: "Es fácil poner de acuerdo al grupo para hacer el trabajo", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 71, texto: "Mis compañeros de trabajo me ayudan cuando tengo dificultades", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 72, texto: "En mi trabajo las personas nos apoyamos unos a otros", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },
  { numero: 73, texto: "Algunos compañeros de trabajo me escuchan cuando tengo problemas", dominio: "Relaciones interpersonales", dimension: "Relaciones interpersonales" },

  // 74-78: Retroalimentación del trabajo
  { numero: 74, texto: "Me informan sobre lo que hago bien en mi trabajo", dominio: "Retroalimentación", dimension: "Retroalimentación del trabajo" },
  { numero: 75, texto: "Me informan sobre lo que debo mejorar en mi trabajo", dominio: "Retroalimentación", dimension: "Retroalimentación del trabajo" },
  { numero: 76, texto: "La información que recibo sobre mi rendimiento en el trabajo es clara", dominio: "Retroalimentación", dimension: "Retroalimentación del trabajo" },
  { numero: 77, texto: "La forma como evalúan mi trabajo en la empresa me ayuda a mejorar", dominio: "Retroalimentación", dimension: "Retroalimentación del trabajo" },
  { numero: 78, texto: "Me informan a tiempo sobre lo que debo mejorar en el trabajo", dominio: "Retroalimentación", dimension: "Retroalimentación del trabajo" },

  // 79-87: Satisfacción, reconocimiento y seguridad
  { numero: 79, texto: "En la empresa me pagan a tiempo mi salario", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 80, texto: "El pago que recibo es el que me ofreció la empresa", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 81, texto: "El pago que recibo es el que merezco por el trabajo que realizo", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 82, texto: "En mi trabajo tengo posibilidades de progresar", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 83, texto: "Las personas que hacen bien el trabajo pueden progresar en la empresa", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 84, texto: "La empresa se preocupa por el bienestar de los trabajadores", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 85, texto: "Mi trabajo en la empresa es estable", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 86, texto: "El trabajo que hago me hace sentir bien", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 87, texto: "Siento orgullo de trabajar en esta empresa", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  { numero: 88, texto: "Hablo bien de la empresa con otras personas", dominio: "Satisfacción", dimension: "Satisfacción y reconocimiento" },
  
  { numero: 89, texto: "En mi trabajo debo brindar servicio a clientes o usuarios?", dominio: "Filtro", dimension: "Filtro", categoria: "F3" },

  // 90-98: Solo si F3 = sí (índices 89 a 97)
  { numero: 90, texto: "Atiendo clientes o usuarios muy enojados", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 91, texto: "Atiendo clientes o usuarios muy preocupados", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 92, texto: "Atiendo clientes o usuarios muy tristes", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 93, texto: "Mi trabajo me exige atender personas muy enfermas", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 94, texto: "Mi trabajo me exige atender personas muy necesitadas de ayuda", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 95, texto: "Atiendo clientes o usuario que me maltratan", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 96, texto: "Mi trabajo me exige atender situaciones de violencia", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 97, texto: "Mi trabajo me exige atender situaciones muy tristes o dolorosas", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" },
  { numero: 98, texto: "Puedo expresar tristeza o enojo frente a las personas que atiendo", dominio: "Satisfacción", dimension: "Atención a usuarios/clientes" }
];

export const esquemaExtralaboral = [
  // 1-30: Preguntas Extralaborales, índices 0-29
  { numero: 1, texto: "Es fácil transportarme entre mi casa y el trabajo", dimension: "Entorno extralaboral", categoria: "Transporte" },
  { numero: 2, texto: "Tengo que tomar varios medios de transporte para llegar a mi lugar de trabajo", dimension: "Entorno extralaboral", categoria: "Transporte" },
  { numero: 3, texto: "Paso mucho tiempo viajando de ida y regreso al trabajo", dimension: "Entorno extralaboral", categoria: "Transporte" },
  { numero: 4, texto: "Me transporto cómodamente entre mi casa y el trabajo", dimension: "Entorno extralaboral", categoria: "Transporte" },
  { numero: 5, texto: "La zona donde vivo es segura", dimension: "Entorno extralaboral", categoria: "Seguridad y entorno" },
  { numero: 6, texto: "En la zona donde vivo se presentan hurtos y mucha delincuencia", dimension: "Entorno extralaboral", categoria: "Seguridad y entorno" },
  { numero: 7, texto: "Desde donde vivo me es fácil llegar al centro médico donde me atienden", dimension: "Entorno extralaboral", categoria: "Acceso servicios" },
  { numero: 8, texto: "Cerca a mi vivienda las vías están en buenas condiciones", dimension: "Entorno extralaboral", categoria: "Infraestructura" },
  { numero: 9, texto: "Cerca a mi vivienda encuentro fácilmente transporte", dimension: "Entorno extralaboral", categoria: "Transporte" },
  { numero: 10, texto: "Las condiciones de mi vivienda son buenas", dimension: "Condiciones de la vivienda", categoria: "Condiciones vivienda" },
  { numero: 11, texto: "En mi vivienda hay servicios de agua y luz", dimension: "Condiciones de la vivienda", categoria: "Condiciones vivienda" },
  { numero: 12, texto: "Las condiciones de mi vivienda me permiten descansar cuando lo requiero", dimension: "Condiciones de la vivienda", categoria: "Condiciones vivienda" },
  { numero: 13, texto: "Las condiciones de mi vivienda me permiten sentirme cómodo", dimension: "Condiciones de la vivienda", categoria: "Condiciones vivienda" },
  { numero: 14, texto: "Me queda tiempo para actividades de recreación", dimension: "Tiempo personal", categoria: "Tiempo libre" },
  { numero: 15, texto: "Fuera del trabajo tengo tiempo suficiente para descansar", dimension: "Tiempo personal", categoria: "Tiempo libre" },
  { numero: 16, texto: "Tengo tiempo para atender mis asuntos personales y del hogar", dimension: "Tiempo personal", categoria: "Tiempo libre" },
  { numero: 17, texto: "Tengo tiempo para compartir con mi familia o amigos", dimension: "Tiempo personal", categoria: "Tiempo libre" },
  { numero: 18, texto: "Tengo buena comunicación con las personas cercanas", dimension: "Red de apoyo social", categoria: "Apoyo social" },
  { numero: 19, texto: "Las relaciones con mis amigos son buenas", dimension: "Red de apoyo social", categoria: "Apoyo social" },
  { numero: 20, texto: "Converso con personas cercanas sobre diferentes temas", dimension: "Red de apoyo social", categoria: "Apoyo social" },
  { numero: 21, texto: "Mis amigos están dispuestos a escucharme cuando tengo problemas", dimension: "Red de apoyo social", categoria: "Apoyo social" },
  { numero: 22, texto: "Cuento con el apoyo de mi familia cuando tengo problemas", dimension: "Red de apoyo social", categoria: "Apoyo social" },
  { numero: 23, texto: "Puedo hablar con personas cercanas sobre las cosas que me pasan", dimension: "Red de apoyo social", categoria: "Apoyo social" },
  { numero: 24, texto: "Mis problemas personales o familiares afectan mi trabajo", dimension: "Familia y relaciones personales", categoria: "Familia" },
  { numero: 25, texto: "La relación con mi familia cercana es cordial", dimension: "Familia y relaciones personales", categoria: "Familia" },
  { numero: 26, texto: "Mis problemas personales o familiares me quitan la energía que necesito para trabajar", dimension: "Familia y relaciones personales", categoria: "Familia" },
  { numero: 27, texto: "Los problemas con mis familiares los resolvemos de manera amistosa", dimension: "Familia y relaciones personales", categoria: "Familia" },
  { numero: 28, texto: "Mis problemas personales o familiares afectan mis relaciones en el trabajo", dimension: "Familia y relaciones personales", categoria: "Familia" },
  { numero: 29, texto: "El dinero que ganamos en el hogar alcanza para cubrir los gastos básicos", dimension: "Economía familiar", categoria: "Finanzas" },
  { numero: 30, texto: "Tengo otros compromisos económicos que afectan mucho el presupuesto familiar", dimension: "Economía familiar", categoria: "Finanzas" },
  { numero: 31, texto: "En mi hogar tenemos deudas difíciles de pagar", dimension: "Economía familiar", categoria: "Finanzas" }
];

export const esquemaEstres = [
  { numero: 1, texto: "Dolores en el cuello y espalda o tensión muscular", categoria: "Síntomas físicos" },
  { numero: 2, texto: "Problemas gastrointestinales, úlcera péptica, acidez, problemas digestivos o del colon", categoria: "Síntomas físicos" },
  { numero: 3, texto: "Problemas respiratorios", categoria: "Síntomas físicos" },
  { numero: 4, texto: "Dolor de cabeza", categoria: "Síntomas físicos" },
  { numero: 5, texto: "Trastornos del sueño como somnolencia durante el día o desvelo en la noche", categoria: "Síntomas físicos" },
  { numero: 6, texto: "Palpitaciones en el pecho o problemas cardíacos", categoria: "Síntomas físicos" },
  { numero: 7, texto: "Cambios fuertes del apetito", categoria: "Síntomas físicos" },
  { numero: 8, texto: "Problemas relacionados con la función de los órganos genitales (Impotencia, frigidez)", categoria: "Síntomas físicos" },
  { numero: 9, texto: "Dificultad en las relaciones familiares", categoria: "Interpersonales/familiares" },
  { numero: 10, texto: "Dificultad para permanecer quieto o dificultad para iniciar actividades", categoria: "Síntomas conductuales" },
  { numero: 11, texto: "Dificultad en las relaciones con otras personas", categoria: "Interpersonales/familiares" },
  { numero: 12, texto: "Sensación de aislamiento y desinterés", categoria: "Síntomas emocionales" },
  { numero: 13, texto: "Sentimiento de sobrecarga de trabajo", categoria: "Síntomas laborales" },
  { numero: 14, texto: "Dificultad para concentrarse, olvidos frecuentes", categoria: "Síntomas cognitivos" },
  { numero: 15, texto: "Aumento en el número de accidentes de trabajo", categoria: "Síntomas conductuales" },
  { numero: 16, texto: "Sentimiento de frustración, de no haber hecho lo que se quería en la vida", categoria: "Síntomas emocionales" },
  { numero: 17, texto: "Cansancio, tedio o desgano", categoria: "Síntomas físicos" },
  { numero: 18, texto: "Disminución del rendimiento en el trabajo o poca creatividad", categoria: "Síntomas laborales" },
  { numero: 19, texto: "Deseo de no asistir al trabajo", categoria: "Síntomas laborales" },
  { numero: 20, texto: "Bajo compromiso o poco interés con lo que se hace", categoria: "Síntomas laborales" },
  { numero: 21, texto: "Dificultad para tomar decisiones", categoria: "Síntomas cognitivos" },
  { numero: 22, texto: "Deseo de cambiar de empleo", categoria: "Síntomas laborales" },
  { numero: 23, texto: "Sentimiento de soledad y miedo", categoria: "Síntomas emocionales" },
  { numero: 24, texto: "Sentimiento de irritabilidad, actitudes y pensamientos negativos", categoria: "Síntomas emocionales" },
  { numero: 25, texto: "Sentimiento de angustia, preocupación o tristeza", categoria: "Síntomas emocionales" },
  { numero: 26, texto: "Consumo de drogas para aliviar la tensión o los nervios", categoria: "Conductas de afrontamiento" },
  { numero: 27, texto: "Sentimientos de que 'no vale nada', o 'no sirve para nada'", categoria: "Síntomas emocionales" },
  { numero: 28, texto: "Consumo de bebidas alcohólicas o café o cigarrillo", categoria: "Conductas de afrontamiento" },
  { numero: 29, texto: "Sentimiento de que está perdiendo la razón", categoria: "Síntomas cognitivos" },
  { numero: 30, texto: "Comportamientos rígidos, obstinación o terquedad", categoria: "Síntomas conductuales" },
  { numero: 31, texto: "Sensación de no poder manejar los problemas de la vida", categoria: "Síntomas emocionales" }
];
