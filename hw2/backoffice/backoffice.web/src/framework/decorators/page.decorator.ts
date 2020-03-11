interface PageParams {
    template: string;
}

export function TrexPage(params: PageParams): any {
    return (ctor: any) => {
        ctor.prototype.__template = params.template;
    }
}