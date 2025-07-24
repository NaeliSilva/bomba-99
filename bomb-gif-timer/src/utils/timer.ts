export function startCountdown(duration: number, onEnd: () => void): void {
    let timer = duration, minutes: number, seconds: number;
    
    const interval = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        console.log(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

        if (--timer < 0) {
            clearInterval(interval);
            onEnd();
        }
    }, 1000);
}