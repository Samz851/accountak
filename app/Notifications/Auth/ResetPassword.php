<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class ResetPassword extends Notification
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
        return ['mail'];
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
            'url' => $this->setPasswordUrl($notifiable),
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
            ->subject(Lang::get('mail.password.reset.subject'))
            ->line(Lang::get('mail.password.reset.greet', ['name' => $data['name']]))
            ->line(Lang::get('mail.password.reset.instruction'))
            ->line(Lang::get('mail.password.reset.disclaimer'))
            ->action(Lang::get('mail.password.reset.action'), $data['url']);
            // ->view('mails.TemporaryPassword', $data);
    }

    /**
     * Get the Set Password URL.
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function setPasswordUrl( mixed $notifiable ): string
    {
        
        $hashable = [$notifiable->id, $notifiable->name, $notifiable->email, $notifiable->phone, $notifiable->created_at];

        return URL::temporarySignedRoute(
            $notifiable->user_type . '.setPassword',
            Carbon::now()->addMinutes(Config::get('auth.hashed.set_password', 60)),
            [
                'id' => $notifiable->getKey(),
                'hash' => Hash::make(implode(',',$hashable)),
                'subdomain' => $notifiable->symbol
            ]
        );
        

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