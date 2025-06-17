// src/data/esquemaFormaB.ts

export const esquemaFormaB = [
  // Demandas ambientales y de esfuerzo físico (1–12)
  { numero: 1, texto: "El ruido en el lugar donde trabajo es molesto", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "inverso" },
  { numero: 2, texto: "En el lugar donde trabajo hace mucho frio", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "inverso" },
  { numero: 3, texto: "En el lugar donde trabajo hace mucho calor", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "inverso" },
  { numero: 4, texto: "El aire en el lugar donde trabajo es fresco y agradable", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "directo" },
  { numero: 5, texto: "La luz del sitio donde trabajo es agradable", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "directo" },
  { numero: 6, texto: "El espacio donde trabajo es comodo", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "directo" },
  { numero: 7, texto: "En mi trabajo me preocupa estar expuesto a sustancias quimicas que afecten mi salud", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "inverso" },
  { numero: 8, texto: "Mi trabajo me exige hacer mucho esfuerzo fisico", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "inverso" },
  { numero: 9, texto: "Los equipos o herramientas con los que trabajo son comodos", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "directo" },
  { numero: 10, texto: "En mi trabajo me preocupa estar expuesto a microbios, animales o plantas que afecten mi salud", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "inverso" },
  { numero: 11, texto: "Me preocupa accidentarme en mi trabajo", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "inverso" },
  { numero: 12, texto: "EL lugar donde trabajo es limpio y ordenado", dominio: "Demandas del trabajo", dimension: "Demandas ambientales y de esfuerzo físico", esquema: "directo" },

  // Demandas cuantitativas y carga mental (13–20)
  { numero: 13, texto: "Por la cantidad de trabajo que tengo debo quedarme tiempo adicional", dominio: "Demandas del trabajo", dimension: "Demandas cuantitativas", esquema: "inverso" },
  { numero: 14, texto: "Me alcanza el tiempo de trabajo para tener al dia mis deberes", dominio: "Demandas del trabajo", dimension: "Demandas cuantitativas", esquema: "directo" },
  { numero: 15, texto: "Por la cantidad de trabajo que tengo debo trabajar sin parar", dominio: "Demandas del trabajo", dimension: "Demandas cuantitativas", esquema: "inverso" },
  { numero: 16, texto: "Mi trabajo me exige hacer mucho esfuerzo mental", dominio: "Demandas del trabajo", dimension: "Demandas de carga mental", esquema: "inverso" },
  { numero: 17, texto: "mi trabajo me exige estar muy concentrado", dominio: "Demandas del trabajo", dimension: "Demandas de carga mental", esquema: "inverso" },
  { numero: 18, texto: "mi trabajo me exige memorizar mucha informacion", dominio: "Demandas del trabajo", dimension: "Demandas de carga mental", esquema: "inverso" },
  { numero: 19, texto: "En mi trabajo tengo que hacer calculos matematicos", dominio: "Demandas del trabajo", dimension: "Demandas de carga mental", esquema: "inverso" },
  { numero: 20, texto: "Mi trabajo requiere que me fije en pequeños detalles", dominio: "Demandas del trabajo", dimension: "Demandas de carga mental", esquema: "inverso" },

  // Demandas de la jornada de trabajo (21–24)
  { numero: 21, texto: "Trabajo en horario de noche", dominio: "Demandas del trabajo", dimension: "Demandas de la jornada de trabajo", esquema: "inverso" },
  { numero: 22, texto: "En mi trabajo es posible tomar pausas para descansar", dominio: "Demandas del trabajo", dimension: "Demandas de la jornada de trabajo", esquema: "directo" },
  { numero: 23, texto: "Mi trabajo me exige laborar en dias de descanso, festivos o fines de semana", dominio: "Demandas del trabajo", dimension: "Demandas de la jornada de trabajo", esquema: "inverso" },
  { numero: 24, texto: "En mi trabajo puedo tomar fines de semana o dias de descanso al mes", dominio: "Demandas del trabajo", dimension: "Demandas de la jornada de trabajo", esquema: "directo" },

  // Influencia del trabajo sobre el entorno extralaboral (25–28)
  { numero: 25, texto: "Cuando estoy en casa sigo pensando en el trabajo", dominio: "Demandas del trabajo", dimension: "Influencia del trabajo sobre el entorno extralaboral", esquema: "inverso" },
  { numero: 26, texto: "Discuto con mi familia o amigos por causa de mi trabajo", dominio: "Demandas del trabajo", dimension: "Influencia del trabajo sobre el entorno extralaboral", esquema: "inverso" },
  { numero: 27, texto: "Debo atender asuntos de trabajo cuando estoy en casa", dominio: "Demandas del trabajo", dimension: "Influencia del trabajo sobre el entorno extralaboral", esquema: "inverso" },
  { numero: 28, texto: "Por mi trabajo el tiempo que paso con mi familia y amigos es muy poco", dominio: "Demandas del trabajo", dimension: "Influencia del trabajo sobre el entorno extralaboral", esquema: "inverso" },

  // Oportunidades para el uso y desarrollo de habilidades y conocimientos (29–32)
  { numero: 29, texto: "En mi trabajo puedo hacer cosas nuevas", dominio: "Control sobre el trabajo", dimension: "Oportunidades para el uso y desarrollo de habilidades y conocimientos", esquema: "directo" },
  { numero: 30, texto: "Mi trabajo me permite desarrollar mis habilidades", dominio: "Control sobre el trabajo", dimension: "Oportunidades para el uso y desarrollo de habilidades y conocimientos", esquema: "directo" },
  { numero: 31, texto: "Mi trabajo me permite aplicar mis conocimientos", dominio: "Control sobre el trabajo", dimension: "Oportunidades para el uso y desarrollo de habilidades y conocimientos", esquema: "directo" },
  { numero: 32, texto: "Mi trabajo me permite aprender nuevas cosas", dominio: "Control sobre el trabajo", dimension: "Oportunidades para el uso y desarrollo de habilidades y conocimientos", esquema: "directo" },

  // Demandas de la jornada de trabajo (33, 37)
  { numero: 33, texto: "Puedo tomar pausas cuando las necesito", dominio: "Demandas del trabajo", dimension: "Demandas de la jornada de trabajo", esquema: "directo" },

  // Control y autonomía sobre el trabajo (34–36)
  { numero: 34, texto: "Puedo decidir cuanto trabajo hago en el dia", dominio: "Control sobre el trabajo", dimension: "Control y autonomía sobre el trabajo", esquema: "directo" },
  { numero: 35, texto: "Puedo decidir la velocidad a la que trabajo", dominio: "Control sobre el trabajo", dimension: "Control y autonomía sobre el trabajo", esquema: "directo" },
  { numero: 36, texto: "Puedo cambiar el orden de las actividades en mi trabajo", dominio: "Control sobre el trabajo", dimension: "Control y autonomía sobre el trabajo", esquema: "directo" },

  { numero: 37, texto: "Puedo parar un momento mi trabajo para atender algun asunto personal", dominio: "Demandas del trabajo", dimension: "Demandas de la jornada de trabajo", esquema: "directo" },

  // Participación y manejo del cambio (38–40)
  { numero: 38, texto: "Me explican claramente los cambios que ocurren en mi trabajo", dominio: "Control sobre el trabajo", dimension: "Participación y manejo del cambio", esquema: "directo" },
  { numero: 39, texto: "Puedo dar sugerencias sobre los cambios que ocurren en mi trabajo", dominio: "Control sobre el trabajo", dimension: "Participación y manejo del cambio", esquema: "directo" },
  { numero: 40, texto: "Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas y sugerencias", dominio: "Control sobre el trabajo", dimension: "Participación y manejo del cambio", esquema: "directo" },

  // Claridad de rol (41–45)
  { numero: 41, texto: "Me informan con claridad cuales son mis funciones", dominio: "Control sobre el trabajo", dimension: "Claridad de rol", esquema: "directo" },
  { numero: 42, texto: "Me informan cuales son las decisiones que puedo tomar en mi trabajo", dominio: "Control sobre el trabajo", dimension: "Claridad de rol", esquema: "directo" },
  { numero: 43, texto: "Me explican claramente los resultados que debo lograr en mi trabajo", dominio: "Control sobre el trabajo", dimension: "Claridad de rol", esquema: "directo" },
  { numero: 44, texto: "Me explican claramente los objetivos de mi trabajo", dominio: "Control sobre el trabajo", dimension: "Claridad de rol", esquema: "directo" },
  { numero: 45, texto: "Me informan claramente con quien puedo resolver los asuntos del trabajo", dominio: "Control sobre el trabajo", dimension: "Claridad de rol", esquema: "directo" },

  // Capacitación (46–48)
  { numero: 46, texto: "La empresa me permite asistir a capacitaciones relacionadas con mi trabajo", dominio: "Control sobre el trabajo", dimension: "Capacitación", esquema: "directo" },
  { numero: 47, texto: "Recibo capacitacion util para hacer mi trabajo", dominio: "Control sobre el trabajo", dimension: "Capacitación", esquema: "directo" },
  { numero: 48, texto: "Recibo capacitacion que me ayuda a hacer mejor mi trabajo", dominio: "Control sobre el trabajo", dimension: "Capacitación", esquema: "directo" },

  // Características del liderazgo (49–61)
  { numero: 49, texto: "Mi jefe ayuda a organizar mejor el trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 50, texto: "Mi jefe tiene en cuenta mis puntos de vista y opiniones", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 51, texto: "Mi jefe me anima para hacer mejor mi trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 52, texto: "Mi jefe distribuye las tareas de forma que me facilita el trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 53, texto: "Mi jefe me comunica a tiempo la informacion relacionada con el trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 54, texto: "La orientacion que me da mi jefe me ayuda a hacer mejor el trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 55, texto: "Mi jefe me ayuda a progresar en el trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 56, texto: "Mi jefe me ayuda a sentirme bien en el trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 57, texto: "Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 58, texto: "Mi jefe me trata con respeto", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 59, texto: "Siento que puedo confiar en mi jefe", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 60, texto: "Mi jefe me escucha cuando tengo problemas de trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },
  { numero: 61, texto: "Mi jefe me brinda su apoyo cuando lo necesito", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Características del liderazgo", esquema: "directo" },

  // Relaciones sociales en el trabajo (62–73)
  { numero: 62, texto: "Me agrada el ambiente de mi grupo de trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 63, texto: "En mi grupo de trabajo me tratan de forma respetuosa", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 64, texto: "Siento que puedo confiar en mis compañeros de trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 65, texto: "Me siento a gusto con mis compañeros de trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 66, texto: "En mi grupo de trabajo algunas personas me maltratan", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "inverso" },
  { numero: 67, texto: "Entre compañeros solucionamos los problemas de forma respetuosa", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 68, texto: "Mi grupo de trabajo es muy unido", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 69, texto: "Cuando tenemos que realizar trabajo de grupo los compañeros colaboran", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 70, texto: "Es facil poner de acuerdo al grupo para hacer el trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 71, texto: "Mis compañeros de trabajo me ayudan cuando tengo dificultades", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 72, texto: "En mi trabajo las peronas nos apoyamos unos a tros", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },
  { numero: 73, texto: "Algunos compañeros de trabajo me escuchan cuando tengo problemas", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Relaciones sociales en el trabajo", esquema: "directo" },

  // Retroalimentación del desempeño (74–78)
  { numero: 74, texto: "Me informan sobre lo que hago bien en mi trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Retroalimentación del desempeño", esquema: "directo" },
  { numero: 75, texto: "Me informan sobre lo que debo mejorar en mi trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Retroalimentación del desempeño", esquema: "directo" },
  { numero: 76, texto: "La información que recibo sobre mi rendimiento en el trabajo es clara", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Retroalimentación del desempeño", esquema: "directo" },
  { numero: 77, texto: "La forma como evaluan mi trabajo en la empresa me ayuda a mejorar", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Retroalimentación del desempeño", esquema: "directo" },
  { numero: 78, texto: "Me informan a tiempo sobre lo que debo mejorar en el trabajo", dominio: "Liderazgo y relaciones sociales en el trabajo", dimension: "Retroalimentación del desempeño", esquema: "directo" },

  // Reconocimiento y compensación (79–84)
  { numero: 79, texto: "En la empresa me pagan a tiempo mi salario", dominio: "Recompensas", dimension: "Reconocimiento y compensación", esquema: "directo" },
  { numero: 80, texto: "El pago que recibo es el que me ofreció la empresa", dominio: "Recompensas", dimension: "Reconocimiento y compensación", esquema: "directo" },
  { numero: 81, texto: "El pago que recibo es el que merezco por el trabajo que realizo", dominio: "Recompensas", dimension: "Reconocimiento y compensación", esquema: "directo" },
  { numero: 82, texto: "En mi trabajo tengo posibilidades de progresar", dominio: "Recompensas", dimension: "Reconocimiento y compensación", esquema: "directo" },
  { numero: 83, texto: "Las personas que hacen bien el trabajo pueden progresar en la empresa", dominio: "Recompensas", dimension: "Reconocimiento y compensación", esquema: "directo" },
  { numero: 84, texto: "La empresa se preocupa por el bienestar de los trabajadores", dominio: "Recompensas", dimension: "Reconocimiento y compensación", esquema: "directo" },

  // Recompensas derivadas de la pertenencia a la organización (85–88)
  { numero: 85, texto: "Mi trabajo en la empresa es estable", dominio: "Recompensas", dimension: "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza", esquema: "directo" },
  { numero: 86, texto: "El trabajo que hago me hace sentir bien", dominio: "Recompensas", dimension: "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza", esquema: "directo" },
  { numero: 87, texto: "Siento orgullo de trabajar en esta empresa", dominio: "Recompensas", dimension: "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza", esquema: "directo" },
  { numero: 88, texto: "Hablo bien de la empresa con otras personas", dominio: "Recompensas", dimension: "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza", esquema: "directo" },

  // Demandas emocionales (89–98)
  { numero: 90, texto: "Atiendo clientes o usuarios muy enojados", dominio: "Demandas del trabajo", dimension: "Demandas emocionales", esquema: "inverso" },
  { numero: 91, texto: "Atiendo clientes o usuarios muy preocupados", dominio: "Demandas del trabajo", dimension: "Demandas emocionales", esquema: "inverso" },
  { numero: 92, texto: "Atiendo clientes o usuarios muy tristes", dominio: "Demandas del trabajo", dimension: "Demandas emocionales", esquema: "inverso" },
  { numero: 93, texto: "Mi trabajo me exige atender personas muy enfermas", dominio: "Demandas del trabajo", dimension: "Demandas emocionales", esquema: "inverso" },
  { numero: 94, texto: "Mi trabajo me exige atender personas muy necesitadas de ayuda", dominio: "Demandas del trabajo", dimension: "Demandas emocionales", esquema: "inverso" },
  { numero: 95, texto: "Atiendo clientes o usuario que me maltratan", dominio: "Demandas del trabajo", dimension: "Demandas emocionales", esquema: "inverso" },
  { numero: 96, texto: "Mi trabajo me exige atender situaciones de violencia", dominio: "Demandas del trabajo", dimension: "Demandas emocionales", esquema: "inverso" },
  { numero: 97, texto: "Mi trabajo me exige atender situaciones muy tristes o dolorosas", dominio: "Demandas del trabajo", dimension: "Demandas emocionales", esquema: "inverso" },
  { numero: 98, texto: "Puedo expresar tristeza o enojo frente a las personas que atiendo", dominio: "Demandas del trabajo", dimension: "Demandas emocionales", esquema: "directo" },
];
