import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import cls from "./DropDown.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Fragment, ReactNode } from "react";
import { DropDownDirection } from "@/shared/types/ui";
import { AppLink } from "../AppLink/AppLink";

export interface DropDownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}
interface DropDownProps {
  className?: string;
  items: DropDownItem[];
  trigger?: ReactNode;
  href?: string;
  direction?: DropDownDirection;
}

const mapDirectionClass: Record<DropDownDirection, string> = {
  "bottom left": cls.optionBottomLeft,
  "bottom right": cls.optionBottomRight,
  "top left": cls.optionTopLeft,
  "top right": cls.optionTopRight,
};

export function DropDown({
  className,
  items,
  trigger,
  direction = "bottom right",
}: DropDownProps) {
  const menuClasses = [mapDirectionClass[direction]];
//   return (
//     <Menu as={"div"} className={classNames(cls.Dropdown, {}, [className])}>
//       <MenuButton className={cls.btn}>{trigger}</MenuButton>
//       <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
//         {items.map((item, index) => {
//           const content = ({ focus }: { focus: boolean }) => (
//             <button
//               disabled={item.disabled}
//               type="button"
//               onClick={item.onClick}
//               className={classNames(cls.item, { [cls.focus]: focus }, [
//                 className,
//               ])}
//             >
//               {item.content}
//             </button>
//           );

//           if (item.href) {
//             return (
//               <MenuItem
//                 key={index}
//                 to={item.href}
//                 as={AppLink}
//                 disabled={item.disabled}
//               >
//                 {content}
//               </MenuItem>
//             );
//           }
//           return (
//             <MenuItem key={index} as={Fragment} disabled={item.disabled}>
//               {content}
//             </MenuItem>
//           );
//         })}
//       </MenuItems>
//     </Menu>
//   );
// }


return (
  <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
      <MenuButton className={cls.btn}>
          {trigger}
      </MenuButton>
      <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
          {items.map((item) => {
              const content = ({ focus }: {focus: boolean}) => (
                  <button
                      type="button"
                      disabled={item.disabled}
                      onClick={item.onClick}
                      className={classNames(cls.item, { [cls.focus]: focus })}
                  >
                      {item.content}
                  </button>
              );

              if (item.href) {
                  return (
                      <MenuItem as={AppLink} to={item.href} disabled={item.disabled}>
                          {content}
                      </MenuItem>
                  );
              }

              return (
                  <MenuItem as={Fragment} disabled={item.disabled}>
                      {content}
                  </MenuItem>
              );
          })}

      </MenuItems>
  </Menu>
);
}
