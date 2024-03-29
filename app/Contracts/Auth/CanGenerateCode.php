<?php

namespace App\Contracts\Auth;

interface CanGenerateCode
{
    /**
     * Save the temporary code
     *
     * @param string $code
     * @return void
     */
    public function setTemporaryCode( string $code ): void;

    /**
     * Generate temporary code
     * 
     * @return string
     */
    public function generateTemporaryCode(): string;

    /**
     * Get the temporary code
     *
     * @return string|null
     */
    public function getTemporaryCode(): ?string;

    /**
     * Verify the temporary code
     *
     * @param string $code
     * @return boolean
     */
    public function verifyTemporaryCode( string $code ): bool;

    /**
     * Delete the temporary code
     *
     * @return boolean
     */
    public function deleteTemporaryCode(): bool;

    /**
     * Send the temporary code notification.
     *
     * @return void
     */
    public function sendTemporaryCodeNotificationEmail(): void;

    /**
     * Send the temporary code notification.
     *
     * @return void
     */
    public function sendTemporaryCodeNotificationSMS(): void;
    
}