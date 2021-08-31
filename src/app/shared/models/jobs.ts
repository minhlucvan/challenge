export enum JobType {
  PartTime = '0',
  FullTime = '1',
}

export interface Job {
  id: string;
  title: string;
  logo: string;
  company: string;
  link: string;
  date: string;
  type: JobType;
  description: string;
}


export interface JobsFilter {
  title?: string;
  jobType?: '0'  | '1' | '-1';
  company?: string;
  search?: string;
}