import { injectable } from 'inversify';

@injectable()
export class DomContainer {
    public readonly $element = document.querySelector('.master-container');
}