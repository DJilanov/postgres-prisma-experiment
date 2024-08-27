import React, { ReactNode } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface Props {
  triggerChildren: string;
  children: ReactNode;
  onSelect?: () => void;
  onOpenChange?: () => void;
}

/**
 * A custom dialog item component that wraps a dropdown menu item with a dialog trigger.
 * 
 * This component renders a dropdown menu item that, when selected, triggers a dialog.
 * The dialog contains the children passed to the component.
 * 
 * @param {Props} props - The properties for the DialogItem component.
 * @param {string} props.triggerChildren - The content to be displayed inside the dropdown menu item, which triggers the dialog.
 * @param {ReactNode} props.children - The content to be displayed inside the dialog.
 * @param {() => void} [props.onSelect] - Optional callback function to be executed when the dropdown item is selected.
 * @param {() => void} [props.onOpenChange] - Optional callback function to be executed when the dialog's open state changes.
 * @returns {JSX.Element} - A React component that displays a dialog triggered by a dropdown menu item.
 */
const DialogItem = React.forwardRef(function DialogItem(props: Props, forwardedRef) {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props;
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <DropdownMenu.Item
          {...itemProps}
          ref={forwardedRef as never}
          className="flex cursor-pointer justify-center pl-0 text-black dark:text-white hover:text-gray-400 mb-4"
          onSelect={(event: { preventDefault: () => void; }) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          <div className="rounded-lg p-2 border border-black dark:border-white w-full text-center">{triggerChildren}</div>
        </DropdownMenu.Item>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay inset-0 bg-gray-600 dark:bg-gray-800 fixed opacity-90" />
        <Dialog.Content className="DialogContent max-w-5/6-full-w max-h-5/6-full-h min-w-[16rem] lg:min-w-[32rem] p-6 rounded bg-gray-300 dark:bg-gray-800 fixed">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default DialogItem;