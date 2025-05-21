interface SyslogEntry {
  id: number;
  timestamp: string;
  severity: string;
  message: string;
}

export type { SyslogEntry };
