// Define a base logger interface
interface Logger {
    setNext(logger: Logger): Logger;
    log(message: string, level: LogLevel): void;
}

// Define log levels
enum LogLevel {
    INFO,
    DEBUG,
    ERROR
}

// Abstract class for handling logs
abstract class AbstractLogger implements Logger {
    private nextLogger: Logger | null = null;

    public setNext(logger: Logger): Logger {
        this.nextLogger = logger;
        return logger;
    }

    public log(message: string, level: LogLevel): void {
        if (this.shouldHandle(level)) {
            this.write(message);
        }
        if (this.nextLogger !== null) {
            this.nextLogger.log(message, level);
        }
    }

    protected abstract shouldHandle(level: LogLevel): boolean;

    protected abstract write(message: string): void;
}

// Concrete logger for handling Info level logs
class InfoLogger extends AbstractLogger {
    protected shouldHandle(level: LogLevel): boolean {
        return level === LogLevel.INFO;
    }

    protected write(message: string): void {
        console.log(`[INFO] ${message}`);
    }
}

// Concrete logger for handling Debug level logs
class DebugLogger extends AbstractLogger {
    protected shouldHandle(level: LogLevel): boolean {
        return level === LogLevel.DEBUG;
    }

    protected write(message: string): void {
        console.log(`[DEBUG] ${message}`);
    }
}

// Concrete logger for handling Error level logs
class ErrorLogger extends AbstractLogger {
    protected shouldHandle(level: LogLevel): boolean {
        return level === LogLevel.ERROR;
    }

    protected write(message: string): void {
        console.log(`[ERROR] ${message}`);
    }
}

// Client code
const infoLogger = new InfoLogger();
const debugLogger = new DebugLogger();
const errorLogger = new ErrorLogger();

// Setup the chain of responsibility
infoLogger.setNext(debugLogger).setNext(errorLogger);

// Usage
infoLogger.log("This is an information message.", LogLevel.INFO);
infoLogger.log("This is a debug message.", LogLevel.DEBUG);
infoLogger.log("This is an error message.", LogLevel.ERROR);

// UML Diagram

/*
---------------------------------
|           Logger              |
 ---------------------------------
| + setNext(logger: Logger): Logger |
| + log(message: string, level: LogLevel): void |
 ---------------------------------
                 |
                 |
 ---------------------------------
|        AbstractLogger        |
 ---------------------------------
| - nextLogger: Logger | null |
 ---------------------------------
| # shouldHandle(level: LogLevel): boolean |
| # write(message: string): void |
 ---------------------------------
                 ^
                 |
            ---------------------
            |        |          |
  ---------------- ---------------- -----------------
  | InfoLogger  | | DebugLogger | | ErrorLogger   |
  ---------------- ---------------- -----------------
  | # shouldHandle(level: LogLevel): boolean       |
  | # write(message: string): void                 |
  ---------------- ---------------- -----------------

---------------------------------
|         LogLevel             |
---------------------------------
| INFO                        |
| DEBUG                       |
| ERROR                       |
---------------------------------

Logger --- (uses) --- LogLevel
AbstractLogger --- (uses) --- LogLevel
*/
