import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const EventCalendar = ({ 
  events, 
  onEventClick, 
  onDateSelect, 
  selectable = false,
  initialDate,
  isSmall = false 
}) => {
  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    initialDate: initialDate || new Date(),
    headerToolbar: isSmall ? {
      left: 'prev',
      center: 'title',
      right: 'next'
    } : {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: events.map(event => ({
      id: event.id,
      title: event.title,
      start: `${event.date}T${event.time || '00:00:00'}`,
      description: event.description,
      location: event.location,
      allDay: !event.time,
      classNames: ['event-item', event.status]
    })),
    eventClick: info => {
      if (onEventClick) {
        onEventClick({
          id: info.event.id,
          title: info.event.title,
          date: info.event.start,
          time: info.event.start.toLocaleTimeString(),
          description: info.event.extendedProps.description,
          location: info.event.extendedProps.location
        });
      }
    },
    selectable: selectable,
    select: info => onDateSelect?.(info.start),
    height: isSmall ? 300 : 'auto',
    contentHeight: isSmall ? 300 : 400,
    aspectRatio: isSmall ? 1.35 : 1.5,
    editable: false,
    dayMaxEvents: isSmall ? 1 : true,
    dayHeaderFormat: isSmall ? { weekday: 'narrow' } : { weekday: 'short' },
    moreLinkContent: (args) => isSmall ? `+${args.num}` : `+${args.num} more`,
    views: {
      dayGrid: {
        dayMaxEvents: isSmall ? 1 : 3
      }
    },
    eventDidMount: (info) => {
      // Add tooltip with event details
      info.el.title = `${info.event.title}\n${info.event.extendedProps.description || ''}\n${info.event.extendedProps.location || ''}`;
    }
  };

  return (
    <div className={`calendar-wrapper ${isSmall ? 'small' : ''}`}>
      <FullCalendar {...calendarOptions} />
    </div>
  );
};

export default EventCalendar;
