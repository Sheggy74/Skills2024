import { ChangeDetectorRef, Component, inject ,AfterViewInit, ViewChild ,OnInit} from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
// import { CalendarOptions, EventInput } from '@fullcalendar/core';
// import { CommonModule } from '@angular/common';
// import { DialogModule } from 'primeng/dialog';
// import { formatDate } from '@fullcalendar/core'; // Импортируем форматирование дат
import { TaskClndService } from '../../services/task-clnd.service';
// import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  // imports: [CommonModule, FullCalendarModule,DialogModule],
  // standalone:true
})
export class CalendarComponent implements OnInit,AfterViewInit {
  visible:boolean=false;
  title = 'bootstraptoangular19';
  taskClndService=inject(TaskClndService);
  // events: any[] = [];
  // calendarOptions:CalendarOptions={};
  isLoading: boolean = true;
  @ViewChild(FullCalendarComponent) fullCalendar!: FullCalendarComponent;
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   plugins: [dayGridPlugin, interactionPlugin],
    // events: [
    //   {
    //     title: 'Conference',
    //     start: '2025-02-10',
    //     end: '2025-02-12',
    //     description: 'Attend a tech conference.'
    //   },
    //   {
    //     title: 'Team Building',
    //     start: '2025-02-15',
    //     end: '2025-02-17',
    //     description: 'Team building event in the mountains.'
    //   },
    //   {
    //     title: 'Client Meeting',
    //     start: '2025-02-20',
    //     end: '2025-02-20',
    //     description: 'Important client meeting.'
    //   }
    // ];
    
  // };
  events:any[]= [
    {
      title: 'Conference',
      start: '2025-02-10T10:00:00',
      end: '2025-02-12T15:00:00',
      description: 'Attend a tech conference.'
    },
    {
      title: 'Team Building',
      start: '2025-02-15T09:00:00',
      end: '2025-02-17T17:00:00',
      description: 'Team building event in the mountains.'
    },
    {
      title: 'Client Meeting',
      start: '2025-02-20T11:00:00',
      end: '2025-02-20T12:00:00',
      description: 'Important client meeting.'
    },
    {
      title: 'Client Meeting',
      start: '2025-02-20T12:00:00',
      end: '2025-02-22T12:00:00',
      description: 'Important client meeting.'
    }
  ];

  //  // Настройки для FullCalendar
  // //  calendarOptions = {
  // //   initialView: 'dayGridMonth', // Устанавливаем вид календаря по умолчанию
  // //   plugins: [dayGridPlugin, interactionPlugin], // Указываем используемые плагины
  // //   events: this.events, // Передаем события
  // //   eventClick: (info:any) => {
  // //     alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
  // //   },
  // //   eventContent: (arg:any) => {
  // //     let startDate = arg.event.start;
  // //     let endDate = arg.event.end;

  // //     const startTime = startDate ? formatDate(startDate, { hour: '2-digit', minute: '2-digit' }) : ''; // Получаем время начала
  // //     const endTime = endDate ? formatDate(endDate, { hour: '2-digit', minute: '2-digit' }) : ''; // Получаем время окончания

  // //     if (endDate) {
  // //       const endDateStr = formatDate(endDate, { year: 'numeric', month: '2-digit', day: '2-digit' }); // Форматируем дату окончания

  // //       return {
  // //         html: `<div class="event-content">
  // //                  <div>${arg.event.title}</div>
  // //                  <div class="event-time">${startTime} - ${endTime}</div> <!-- Время -->
  // //                  <div class="end-date" style="background-color: #ff6347; color: white; padding: 2px 5px;">End: ${endDateStr}</div> <!-- Конец -->
  // //                </div>`
  // //       };
  // //     }

  // //     return {
  // //       html: `<div class="event-content">
  // //                <div>${arg.event.title}</div>
  // //                <div class="event-time">${startTime} - ${endTime}</div> <!-- Время -->
  // //              </div>`
  // //     };
  // //   }
  // // };
  // // calendarOptions = {
  // //   initialView: 'dayGridMonth', // Устанавливаем вид календаря по умолчанию
  // //   plugins: [dayGridPlugin, interactionPlugin], // Указываем используемые плагины
  // //   events: this.taskClndService.tasks.getValue(), // Передаем события
  // //   eventClick: (info:any) => {
  // //     alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
  // //   },
  // //   eventContent: (arg:any) => {
  // //     let startDate = arg.event.start;
  // //     let endDate = arg.event.end;

  // //     const startTime = startDate ? formatDate(startDate, { hour: '2-digit', minute: '2-digit' }) : ''; // Получаем время начала
  // //     const endTime = endDate ? formatDate(endDate, { hour: '2-digit', minute: '2-digit' }) : ''; // Получаем время окончания

  // //     if (endDate) {
  // //       const endDateStr = formatDate(endDate, { year: 'numeric', month: '2-digit', day: '2-digit' }); // Форматируем дату окончания

  // //       return {
  // //         html: `<div class="event-content">
  // //                  <div>${arg.event.title}</div>
  // //                  <div class="event-time">${startTime} - ${endTime}</div> <!-- Время -->
  // //                  <div class="end-date" style="background-color: #ff6347; color: white; padding: 2px 5px;">End: ${endDateStr}</div> <!-- Конец -->
  // //                </div>`
  // //       };
  // //     }

  // //     return {
  // //       html: `<div class="event-content">
  // //                <div>${arg.event.title}</div>
  // //                <div class="event-time">${startTime} - ${endTime}</div> <!-- Время -->
  // //              </div>`
  // //     };
  // //   }
  // // };

  
  // handleDateClick(arg :any) {
  //   alert('Date clicked: ' + arg.dateStr);
  // }
  // showDialog(id:number){
  //   this.taskClndService.getTasks(id??0);
  //   // this.calendarOptions = {
  //   //   initialView: 'dayGridMonth', // Устанавливаем вид календаря по умолчанию
  //   //   plugins: [dayGridPlugin, interactionPlugin], // Указываем используемые плагины
  //   //   events: this.events
  //   //   ,
  //   //   eventClick: (info:any) => {
  //   //     alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
  //   //   },
  //   //   eventContent: (arg:any) => {
  //   //     let endDate = arg.event.end; // Получаем конечную дату события\
  //   //     console.log(this.events);
  //   //     if (endDate) {
  //   //       const endDateStr = endDate.toISOString().split('T')[0]; // Преобразуем в строку (формат: yyyy-mm-dd)
          
  //   //       return {
  //   //         html: `<div class="event-content">
  //   //                  <div>${arg.event.title}</div>
  //   //                  <div class="end-date" style="background-color: #ff6347; color: white; padding: 2px 5px;">End: ${endDateStr}</div>
  //   //                </div>`
  //   //       };
  //   //     }
  //   //     return {
  //   //       html: `<div class="event-content">
  //   //                <div>${arg.event.title}</div>
  //   //              </div>`
  //   //     };
  //   //   }
  //   // };
  //   this.visible=true;
  // }

  // override ngOnInit(): void {
  //   this.taskClndService.tasks.subscribe((tasks) => {
  //     // Преобразуем данные из сервиса в нужный формат для FullCalendar
  //     this.events = tasks.map(task => ({
  //       title: task.title,
  //       start: task.start,  // Используем только дату (без времени)
  //       end: task.end,      // Используем только дату (без времени)
  //       description: task.description
  //     }));

  //     // После получения данных, скрываем индикатор загрузки
  //     this.isLoading = false;
  //   });
  //       this.calendarOptions = {
  //         initialView: 'dayGridMonth', // Устанавливаем вид календаря по умолчанию
  //         plugins: [dayGridPlugin, interactionPlugin], // Указываем используемые плагины
  //         events: this.events
  //         ,
  //         eventClick: (info:any) => {
  //           alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
  //         },
  //         eventContent: (arg:any) => {
  //           let endDate = arg.event.end; // Получаем конечную дату события\
  //           console.log(this.events);
  //           if (endDate) {
  //             const endDateStr = endDate.toISOString().split('T')[0]; // Преобразуем в строку (формат: yyyy-mm-dd)
              
  //             return {
  //               html: `<div class="event-content">
  //                        <div>${arg.event.title}</div>
  //                        <div class="end-date" style="background-color: #ff6347; color: white; padding: 2px 5px;">End: ${endDateStr}</div>
  //                      </div>`
  //             };
  //           }
  //           return {
  //             html: `<div class="event-content">
  //                      <div>${arg.event.title}</div>
  //                    </div>`
  //           };
  //         }
  //       };
        
  // }
  // calendarOptions = {
  //   initialView: 'dayGridMonth',
  //   plugins: [dayGridPlugin, interactionPlugin],
  //   events: this.events, // Передаем события из сервиса
  //   eventClick: (info:any) => {
  //     alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
  //   },
  //   eventContent: (arg:any) => {
  //     return {
  //       html: `<div class="event-content">
  //                <div>${arg.event.title}</div>
  //              </div>`
  //     };
  //   }
  // };
  // events: EventInput[] = []; // Массив для событий
  // isLoading: boolean = true; // Флаг для отображения загрузки
  // visible: boolean = false; // Флаг для отображения диалога
  // calendarComponent: FullCalendarComponent | undefined ; // Переменная для доступа к FullCalendar
  // taskClndService=inject(TaskClndService);
  // cdr=inject(ChangeDetectorRef);
  // calendarOptions: CalendarOptions | undefined;
  // http: any;
  // constructor(
  //   private taskClndService: TaskClndService,
  //   private cdr: ChangeDetectorRef // Инжектируем ChangeDetectorRef
  // ) {}

   ngOnInit():void {
    // this.taskClndService.tasks.subscribe(task=>{
    //   this.events=task;
    //   setTimeout(() => {
    //     this.calendarOptions.events = this.events;  // Принудительное обновление событий в календаре
    //   }, 0);
    // })
    // this.taskClndService.tasks.subscribe(task=>{
    //   this.events=task;
    //   setTimeout(() => {
    //     this.calendarOptions.events = this.events;  // Принудительное обновление событий в календаре
    //   }, 0);
    // })
    setTimeout(() => {
      this.calendarOptions.events = this.events;  // Принудительное обновление событий в календаре
    }, 0);
  }
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
 

  // Открытие диалога
  openDialog() {
    this.visible = true;
  }

  // Закрытие диалога
  closeDialog() {
    this.visible = false;
  }

  // calendarOptions = {
  //   initialView: 'dayGridMonth', // Устанавливаем вид календаря по умолчанию
  //   plugins: [dayGridPlugin, interactionPlugin], // Указываем используемые плагины
  //   events: this.events
  //   ,
  //   eventClick: (info:any) => {
  //     alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
  //   },
  //   eventContent: (arg:any) => {
  //     console.log(arg.event);
  //     let endDate = arg.event.end; // Получаем конечную дату события\
  //     // console.log(this.events);
  //     if (endDate) {
  //       const endDateStr = endDate.toISOString().split('T')[0]; // Преобразуем в строку (формат: yyyy-mm-dd)
  //       const deadline = arg.event.extendedProps.deadline;
  //       console.log(deadline);
  //       return {
  //         html: `<div class="event-content">
  //                  <div>${arg.event.title}</div>
  //                  <div class="deadline" style="background-color: #ae4c4c; color: white; padding: 2px 5px;">Deadline: ${deadline}</div>
  //                </div>`
  //       };
  //     }
  //     return {
  //       html: `<div class="event-content">
  //                <div>${arg.event.title}</div>
  //              </div>`
  //     };
  //   }
  // };
  calendarOptions = {
    initialView: 'timeGridWeek',  // Устанавливаем вид по умолчанию (например, недельный)
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'  // Кнопки для выбора вида (день, неделя)
    },
    events: [
      { title: 'Event 1', date: '2025-02-01T10:00:00' },
      { title: 'Event 2', date: '2025-02-01T14:00:00' },
      { title: 'Event 3', date: '2025-02-02T12:00:00' }
    ],
    editable: true,  // Включаем редактирование событий
    droppable: true,  // Разрешаем перетаскивание событий
    nowIndicator: true  // Показываем индикатор текущего времени
  };
  
  ngAfterViewInit() {
    // После того, как диалог станет видимым, перерендериваем календарь
    if (this.fullCalendar) {
      this.fullCalendar.getApi().render();
    }
  }

  onDialogShow() {
    setTimeout(() => {
      if (this.fullCalendar) {
        this.fullCalendar.getApi().render(); // Принудительно обновляем календарь
      }
    }, 0);
  }
}
