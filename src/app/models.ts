import moment from 'moment';

export interface TeamConfig {
  id: number;
  startTime: string;
  endTime: string;
}

export interface Assignment {
  id: number;
  startTime: string;
  endTime: string;
  description: string;
}

export interface Position {
  id: number;
  title: string;
  assignments: Assignment[];
}

export interface Team {
  id: number;
  name: string;
  config: TeamConfig;
  positions: Position[];
}

export class Time {
  datetime: moment.Moment;

  constructor(input: moment.Moment | Date | string) {
    if (typeof input === 'string') {
      this.datetime = moment(`1970-01-01T${input}`);
    } else {
      this.datetime = moment(input);
    }

    if (!this.datetime.isValid()) {
      throw new Error('invalid time format is given');
    }
  }

  toString(): string {
    return this.datetime.format('HH:mm');
  }

  add(amount: number, unit: moment.unitOfTime.DurationConstructor): Time {
    return new Time(this.datetime.clone().add(amount, unit));
  }

  diff(time: Time, unit: moment.unitOfTime.Diff): number {
    return this.datetime.diff(time.datetime, unit);
  }
}
