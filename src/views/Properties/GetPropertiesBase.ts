import {VueEx} from "@/VueEx";
import {IGetPropertiesResult} from "@/components/ServiceConnector";

export class GetPropertiesBase extends VueEx {
    public Content: string = "";
    public Items: IGetPropertiesResult[] = [];
}