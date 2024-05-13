import { DropDownDirection } from "@/shared/types/ui";
import cls from "./popup.module.scss";

export const mapDirectionClass: Record<DropDownDirection, string> = {
    "bottom left": cls.optionBottomLeft,
    "bottom right": cls.optionBottomRight,
    "top left": cls.optionTopLeft,
    "top right": cls.optionTopRight,
};
