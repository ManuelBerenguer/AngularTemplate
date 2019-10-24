import { UsersRepository } from '../repositories/user.repository';

/**
 * @description
 * This is an abstraction layer that will behave as a mediator and the facade for the presentation layer,
 *  to decouple presentational layer from core layer (Separation of concerns principle).
 * It means that it will expose an API and coordinate the communication between multiple presentational apps and application core.
 * Each presentation app service will extend this base class which will act as an interface and the base class they will inherit from.
 * Here we can define which methods and properties each presentational service needs to have.
 * It will represent a contract, with method implementations which can be overridden as well
 */
export abstract class BasePresentation {

  // We provide access to user data for all feature applications
  protected loggedUser$ = this.usersRepository.getAuthenticatedUser();

  constructor(protected usersRepository: UsersRepository) {}
}
