export interface ErrorResponse {
    error?: string;
}

export interface Breadcrumb{
    url : string;
    label : string;
}
export interface BreadcrumbData{
    data : Breadcrumb[]
}
