import type { CalendarEvent } from '../types';

export const exportToGoogleCalendar = (event: CalendarEvent): void => {
  const startDate = new Date(event.start);
  const endDate = new Date(event.start);
  endDate.setHours(endDate.getHours() + 1); // Default 1 hour duration

  const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
  googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
  googleCalendarUrl.searchParams.append('text', event.title);
  googleCalendarUrl.searchParams.append('details', event.extendedProps.description || '');
  googleCalendarUrl.searchParams.append('dates', `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`);

  window.open(googleCalendarUrl.toString(), '_blank');
};

export const exportToICS = (events: CalendarEvent[]): void => {
  const icsContent = generateICSContent(events);
  downloadFile(icsContent, 'seo-calendar.ics', 'text/calendar');
};

export const exportToCSV = (events: CalendarEvent[]): void => {
  const csvContent = generateCSVContent(events);
  downloadFile(csvContent, 'seo-calendar.csv', 'text/csv');
};

// Helper functions
function formatGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function generateICSContent(events: CalendarEvent[]): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AI SEO Platform//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  events.forEach(event => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.start);
    endDate.setHours(endDate.getHours() + 1);

    lines.push(
      'BEGIN:VEVENT',
      `UID:${generateUID()}@aiseo.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${escapeICS(event.title)}`,
      `DESCRIPTION:${escapeICS(event.extendedProps.description || '')}`,
      `CATEGORIES:${event.extendedProps.type.toUpperCase()}`,
      'END:VEVENT'
    );
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function generateCSVContent(events: CalendarEvent[]): string {
  const headers = ['Date', 'Title', 'Type', 'Description'];
  const rows = events.map(event => [
    event.start,
    `"${event.title.replace(/"/g, '""')}"`,
    event.extendedProps.type,
    `"${(event.extendedProps.description || '').replace(/"/g, '""')}"`
  ]);

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function generateUID(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}