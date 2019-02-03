import {
  fromMinutesToMs,
  fromMsToMinutes,
  fromBToGB,
} from './converters';

describe('Helpers/Converters', () => {
  it('should convert from milliseconds to minutes', () => {
    expect(fromMsToMinutes(0)).toEqual(0);
    expect(fromMsToMinutes(9180000)).toEqual(153);
  });

  it('should convert from minutes to milliseconds', () => {
    expect(fromMinutesToMs(0)).toEqual(0);
    expect(fromMinutesToMs(153)).toEqual(9180000);
  });

  it('should convert from bytes to gigabytes', () => {
    expect(fromBToGB(0)).toEqual(0);
    expect(fromBToGB(17179869184)).toEqual(16);
  });
});
