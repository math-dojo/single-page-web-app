import { UserPermission } from './permissions';

/**
 * A model representing an authenticated math-dojo user.
 */
export class User {
  public readonly name: string;
  public readonly profileImageLink: string;
  public readonly permissions: Set<UserPermission>;
  public readonly belongsToOrgWithId: string;

  constructor({
    name,
    profileImageLink = '',
    permissions = new Set([UserPermission.CONSUMER]),
    belongsToOrgWithId
  }: {
    name: string,
    profileImageLink?: string,
    permissions?: Set<UserPermission>,
    belongsToOrgWithId: string
  }) {
    this.name = name;
    this.profileImageLink = profileImageLink;
    this.permissions = permissions;
    this.belongsToOrgWithId = belongsToOrgWithId;
  }
}
