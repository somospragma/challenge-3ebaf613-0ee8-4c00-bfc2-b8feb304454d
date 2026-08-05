# Prompt para Mejorar el Codigo Base

Copia y pega el siguiente contenido completo en un asistente de IA (Claude, ChatGPT, etc.)
para obtener un ZIP con el proyecto corregido y listo para compilar.

---

```
Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación o descripciones sin código, genera los archivos
correspondientes sin aplicar análisis de compilación
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:
// === ARCHIVO: src/domain/entities/user.ts ===
import { UserDto } from '../../application/dtos/userDto';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: string
  ) {}

  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
}

// === ARCHIVO: src/application/dtos/userDto.ts ===
export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
}

// === ARCHIVO: src/application/services/userService.ts ===
import { User } from '../entities/user';
import { UserDto } from './dtos/userDto';
import { UserRepository } from '../infrastructure/repositories/userRepository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    return user.toDto();
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    const user = new User(userDto.id, userDto.name, userDto.email, userDto.role);
    await this.userRepository.save(user);
    return user.toDto();
  }
}

// === ARCHIVO: src/infrastructure/repositories/userRepository.ts ===
import { User } from '../entities/user';

export class UserRepository {
  async findById(id: string): Promise<User> {
    // Simulate database call
    const users = [
      new User('1', 'John Doe', 'john@example.com', 'admin'),
      new User('2', 'Jane Doe', 'jane@example.com', 'user'),
    ];
    return users.find(user => user.id === id) || Promise.reject('User not found');
  }

  async save(user: User): Promise<void> {
    // Simulate database save
    console.log('User saved:', user);
  }
}

// === ARCHIVO: src/presentation/pages/user/user.page.ts ===
import { Component } from '@angular/core';
import { UserService } from '../../application/services/userService';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  user: any;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    try {
      this.user = await this.userService.getUserById('1');
    } catch (error) {
      console.error(error);
    }
  }
}

// === ARCHIVO: test/userService.spec.ts ===
import { TestBed } from '@angular/core/testing';
import { UserService } from '../src/application/services/userService';
import { UserRepository } from '../src/infrastructure/repositories/userRepository';
import { User } from '../src/domain/entities/user';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
  });

  it('should return user by id', async () => {
    const userDto = await userService.getUserById('1');
    expect(userDto.name).toBe('John Doe');
  });

  it('should create user', async () => {
    const userDto = {
      id: '3',
      name: 'New User',
      email: 'new@example.com',
      role: 'user',
    };
    const createdUserDto = await userService.createUser(userDto);
    expect(createdUserDto.name).toBe('New User');
  });
});

// === ARCHIVO: config/sonar-project.properties ===
# Required metadata
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0

# Path to the source files
sonar.sources=src

# Encoding of the source files
sonar.sourceEncoding=UTF-8

// === ARCHIVO: scripts/run-sonarqube.sh ===
#!/bin/bash

# Run SonarQube scanner
sonarqube-scanner

// === ARCHIVO: docs/diagnostico.md ===
# Informe de Diagnóstico

## Áreas de Mejora Identificadas

- Violación del principio de Single Responsibility en la clase `UserRepository`.
- Falta de legibilidad y mantenibilidad en el código de `UserService`.

// === ARCHIVO: docs/refactorizacion.md ===
# Documentación de Cambios Realizados

## Cambios en `UserRepository`

- Separación de responsabilidades para cumplir con el principio de Single Responsibility.

## Cambios en `UserService`

- Mejora en la legibilidad y mantenibilidad del código siguiendo Clean Code.

// === ARCHIVO: docs/verificacion-metricas.md ===
# Informe de Verificación de Métricas

## Resultados de la Verificación

- Métricas de código cumplidas según SonarQube.

## Propuestas de Mejora

- Continuar aplicando los principios SOLID y Clean Code en futuros desarrollos.

// === ARCHIVO: package.json ===
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "test": "jasmine --config=jasmine.json",
    "sonar": "bash scripts/run-sonarqube.sh"
  },
  "dependencies": {
    "@ionic/angular": "^7.0.0"
  },
  "devDependencies": {
    "sonarqube-scanner": "^3.0.0",
    "jasmine": "^4.0.0",
    "karma": "^6.0.0"
  }
}
```
