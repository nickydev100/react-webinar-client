export const daysOfWeek = [
  {value: '0', text: 'Monday'},
  {value: '1', text: 'Tuesday'},
  {value: '2', text: 'Wednesday'},
  {value: '3', text: 'Thursday'},
  {value: '4', text: 'Friday'},
  {value: '5', text: 'Saturday'},
  {value: '6', text: 'Sunday'}
]

export const getDayOfWeek = (dayOfWeekNum) => {
  const dayOfWeekObj = daysOfWeek.find(dayOfWeek => dayOfWeek.value === dayOfWeekNum)
  return dayOfWeekObj.text
}

export const timezones = [
  {value: 'US/Pacific', text: 'US/Pacific'},
  {value: 'US/Central', text: 'US/Central'},
  {value: 'US/Eastern', text: 'US/Eastern'}
]
