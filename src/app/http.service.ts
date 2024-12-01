import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject} from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly apiKey = '98f97036-92df-4311-bff4-2d06f3257ef8'
  private readonly apiServer = 'https://pit-cnpj-6a154954b78f.herokuapp.com'

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  /**
   * Performs a GET request to the specified path.
   * @param path The API endpoint path.
   * @returns Observable containing the response data.
   */
  public get<T>(path: string): Observable<T> {
    this.setLoadingState(true)
    return this.http.get<T>(`${this.apiServer}/${path}`, this.getHeaders()).pipe(
      catchError(this.handleError),
      finalize(() => this.setLoadingState(false))
    )
  }

  /**
   * Performs a POST request to the specified path.
   * @param path The API endpoint path.
   * @param data The payload to be sent.
   * @returns Observable containing the response data.
   */
  public post<T>(path: string, data: any): Observable<T> {
    this.setLoadingState(true)
    return this.http.post<T>(`${this.apiServer}/${path}`, data, this.getHeaders()).pipe(
      catchError(this.handleError),
      finalize(() => this.setLoadingState(false))
    )
  }

  /**
   * Configures HTTP headers for requests.
   * @returns Configuration object containing headers.
   */
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      }),
    }
  }

  /**
   * Handles HTTP errors.
   * @param error The HTTP error response.
   * @returns An observable throwing an error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Error:', error)
    if (error.status === 0) {
      return throwError(() => new Error('000 - Erro de conexão com o servidor, verifique sua conexão com a internet.'))
    }
    const errorMessage = `${error?.error?.code || ''} - ${error?.error?.message || 'Erro desconhecido.'}`
    return throwError(() => new Error(errorMessage))
  }

  /**
   * Updates the loading state.
   * @param isLoading True if a request is loading, otherwise false.
   */
  private setLoadingState(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading)
  }
}
