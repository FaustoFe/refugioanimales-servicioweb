const { Router } = require('express')
const router = Router()
const animal = require('../controllers/animal')
const raza = require('../controllers/raza')
const tipo_animal = require('../controllers/tipo-animal')
const evento = require('../controllers/evento')


/**
 * @swagger
 * /animales:
 *  get:
 *    description: Usar para obtener todos los animales
 *    tags:
 *      - Animal
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      default:
 *        description: Error inesperado
 */
router.get('/animales', animal.getAnimales)

/**
 * @swagger
 * /animales/{id}:
 *  get:
 *    description: Usar para obtener un animal en particular
 *    tags:
 *      - Animal
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id numerica del animal
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: La id especificada es invalida (no es un número)
 *      default:
 *        description: Error inesperado
 */
router.get('/animales/:id', animal.getAnimalById)

/**
 * @swagger
 * /razas:
 *  get:
 *    description: Usar para obtener todas las razas
 *    tags:
 *      - Raza
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      default:
 *        description: Error inesperado
 */
router.get('/razas', raza.getRazas)

/**
 * @swagger
 * /razas/{id}:
 *  get:
 *    description: Usar para obtener una raza en particular
 *    tags:
 *      - Raza
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id numerica de la raza
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: La id especificada es invalida (no es un número)
 *      default:
 *        description: Error inesperado
 */
router.get('/razas/:id', raza.getRazaById)

/**
 * @swagger
 * /eventos:
 *  get:
 *    description: Usar para obtener todos los eventos
 *    tags:
 *      - Evento
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      default:
 *        description: Error inesperado
 */
router.get('/eventos', evento.getEventos)

/**
 * @swagger
 * /tipos_animales:
 *  get:
 *    description: Usar para obtener todos los tipos de animales
 *    tags:
 *      - Tipo de Animal
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      default:
 *        description: Error inesperado
 */
router.get('/tipos_animales', tipo_animal.getTipoAnimal)

/**
 * @swagger
 * /tipos_animales/{id}:
 *  get:
 *    description: Usar para obtener un tipo de animal en particular
 *    tags:
 *      - Tipo de Animal
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id numerica del tipo de animal
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: La id especificada es invalida (no es un número)
 *      default:
 *        description: Error inesperado
 */
router.get('/tipos_animales/:id', tipo_animal.getTipoAnimalById)


module.exports = router
