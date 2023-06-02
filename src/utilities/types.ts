interface BackupFormValues {
  host: string;
  username: string;
  password: string;
  port: string;
  dbname: string;
  rrule: string;
  destination: string;
}

interface BackupScheduleRecord {
  id: string;
  backup_id: string;
  created_at: string;
  destination: string;
  status: string;
}

export type { BackupFormValues, BackupScheduleRecord };
