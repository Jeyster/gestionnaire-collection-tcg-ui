import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, timer, switchMap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ScrapingService {

    private running$ = new BehaviorSubject<boolean>(false);

    public status$ = this.running$.asObservable();

    constructor(private http: HttpClient) { }

    start() {
        this.http.post('/gestionnaire-collection-tcg/v1/scraping/start', {})
            .subscribe(() => {
                this.running$.next(true);
                this.pollStatus();
            });
    }

    stop() {
        this.http.post('/gestionnaire-collection-tcg/v1/scraping/stop', {})
            .subscribe(() => {
                this.running$.next(false);
            });
    }

    pollStatus() {
        timer(0, 2000).pipe(
            switchMap(() =>
                this.http.get<boolean>('/gestionnaire-collection-tcg/v1/scraping/status')
            )
        ).subscribe(running => {
            this.running$.next(running);
        });
    }

    getLogs() {
        return this.http.get<string[]>('/gestionnaire-collection-tcg/v1/scraping/logs');
    }

}
