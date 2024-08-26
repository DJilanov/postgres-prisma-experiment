import React, { ReactNode } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface Props {
  triggerChildren: string;
  children: ReactNode;
  onSelect?: () => void;
  onOpenChange?: () => void;
}

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
        <Dialog.Content className="DialogContent max-w-5/6-full-w max-h-5/6-full-h min-w-[32rem] p-6 rounded bg-gray-300 dark:bg-gray-800 fixed">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default DialogItem;