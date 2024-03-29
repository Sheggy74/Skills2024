<?php

namespace App\Console;

use App\Http\Controllers\HRController;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

        // Запуск `php artisan schedule:run`
        $schedule->call(
            function () {
                $hrdata = new HRController();
                $hrdata->getDataFromHR();
            }
        // )->hourly();
        //)->daily();
        )->dailyAt('22:35');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
