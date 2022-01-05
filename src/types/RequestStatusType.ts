import { requestStatus } from '../enum';

export type RequestStatusType =
  | requestStatus.idle
  | requestStatus.loading
  | requestStatus.succeeded
  | requestStatus.failed;
