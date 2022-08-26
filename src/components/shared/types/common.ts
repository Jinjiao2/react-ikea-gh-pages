// List
export interface List {
  limit?: number
  start?: number
}

export type Identifier = {
  id: string
}

export type Name = {
  name: string
}
export interface IdentifierAndName extends Identifier, Name {}

export interface DropdownRawData {
  id: string
  name: string
  metadata?: string
}

export interface IdentifierAndNameAndError {
  id?: string
  name?: string
  errorCode?: string
  errorMessage?: string
}

export type DropdownOptionType = {
  label: string
  value: string
  version?: IdentifierAndName
  tooltip?: string
  type?: string
}

export type GroupedDropdownOptionType = {
  label: string
  options: DropdownOptionType[]
}

export enum SortOrder {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export enum DiffLabel {
  'FROM' = 'from',
  'TO' = 'to',
}

export enum FormType {
  CREATE = 'create',
  UPDATE = 'update',
  UPGRADE = 'upgrade',
}

export type PathParams = {
  clusterId: string
  serviceId: string
  projectId: string
  tagId?: string
  deploymentId?: string
  jobId?: string
  versionId?: string
  namespaceId?: string
  runId?: string
  notebookId?: string
  kernelId?: string
  code?: string
  state?: string
  notebookName?: string
  kernelSpecId?: string
  secretId?: string
  bucketId?: string
  teamId?: string
  contributorId?: string
  serviceUpdate?: string
  trinoClusterId?: string
  catalogName?: string
  databaseName?: string
  tableName?: string
  tableColumnName?: string
  workflowId?: string
  pluginId?: string
  whisperNamespaceId?: string
  secretsAssociationId?: string
  lakehouseId?: string
  applicationId?: string
}

export type BaseProps = {
  'data-testid'?: string
}

export enum GitIconState {
  RUNNING = 'RUNNING',
  FAILED = 'FAILED',
  READY = 'READY',
}

export enum ENotificationState {
  ERROR = 'ERROR',
  INFO = 'INFO',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}

export type MessageResponse = {
  message: string
}

export type CommonResponse = MessageResponse & {
  statusUrl: string
}

export type UpdateList = {
  _append?: string[]
  _remove?: string[]
}

export type UpdateMap = {
  _replace?: Record<string, any>
  _put?: Record<string, any>
  _removeKeys?: string[]
}

export enum ESystemAppearance {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  AUTO = 'AUTO',
}
