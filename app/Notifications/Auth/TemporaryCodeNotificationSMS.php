<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Channels\VonageSmsChannel;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\VonageMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\HtmlString;

class TemporaryCodeNotificationSMS extends Notification
{
    use Queueable;

    /**
     * The callback that should be used to create the verify email URL.
     *
     * @var \Closure|null
     */
    public static $createUrlCallback;

    /**
     * The callback that should be used to build the mail message.
     *
     * @var \Closure|null
     */
    public static $toMailCallback;

    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     * @return array|string
     */
    public function via($notifiable)
    {
        return ['vonage'];
    }

    /**
 * Get the Vonage / SMS representation of the notification.
 *
 * @param  mixed  $notifiable
 * @return \Illuminate\Notifications\Messages\VonageMessage
 */
public function toVonage($notifiable)
{
    Log::info($notifiable, ['sms not']);
    return (new VonageMessage())
                ->content('Your SMS message content');
}

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail( mixed $notifiable ): MailMessage
    {
        $data = [
            'code' => $notifiable->getTemporaryCode(),
            'name' => $notifiable->name
        ];

        return $this->buildMailMessage($data);
    }

    /**
     * Get the Temporary Password Mail Message.
     *
     * @param  array  $data
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    protected function buildMailMessage( array $data ): MailMessage
    {
        return (new MailMessage)
            ->subject(Lang::get('mail.code.subject'))
            ->line(Lang::get('mail.code.greet'), ['name' => $data['name']])
            ->line(Lang::get('mail.code.instruction'))
            ->line( new HtmlString(Lang::get('mail.code.code', ['code' => $data['code']])));
            // ->view('mails.TemporaryPassword', $data);
    }

    /**
     * Set a callback that should be used when building the notification mail message.
     *
     * @param  \Closure  $callback
     * @return void
     */
    public static function toMailUsing($callback)
    {
        static::$toMailCallback = $callback;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}