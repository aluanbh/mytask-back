export interface HttpResponse {
	statusCode: number;
	data: any;
}

export interface HttpRequest {
	body?: any;
	method?: HttpMethod;
	params?: any;
	headers?: any;
	query?: any;
	user?: any;
}

export interface HttpMethod {
	value: string;
}

export interface Controller {
	handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
