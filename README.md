Usuario {
  id: string,
  nombre: string,
  email: string,
  contraseña: string, 
  avatar: string (opcional),
  historial: [ { fecha: Date, accion: string } ], 
  fecha_creacion: Date,
  fecha_actualizacion: Date
}


Hábito {
  id: string,
  usuarioId: string,
  nombre: string,
  categoria: string, // salud, productividad, bienestar...
  frecuencia: string, // diaria, semanal, mensual
  prioridad: string (opcional),
  
  recordatorio: string (hora opcional),
  fecha_creacion: Date,
  fecha_actualizacion: Date
}

 
Progreso {
  id: string,
  habitId: string,
  usuarioId: string,
  fecha: Date,
  completado: boolean
}


Gamificacion {
  usuarioId: string,
  puntos: number,
  badges: [string], // lista de badges
  nivel: number (fase 2)
}


Notificacion {
  usuarioId: string,
  mensaje: string,
  fecha_envio: Date,
  leida: boolean
}
