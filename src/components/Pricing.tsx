import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Link, Image } from '@nextui-org/react';

export default function Pricing() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Link size="sm" className=" hover:cursor-pointer" onPress={onOpen}>
        SUTRA PRICING
      </Link>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="bg-[rgb(34,34,34)] pt-5">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex items-center justify-center">
                  <Image src="/public/pricing.png" alt="Pricing" width={600} height={700} draggable={false} />
                </div>
                <Link isExternal className="block pl-8 text-white hover:text-gray-50" href="https://www.two.ai/contact">
                  Contact US
                </Link>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
