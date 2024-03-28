import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from '@nextui-org/react';
import { useLocalStorage } from '@uidotdev/usehooks';

export default function WelcomeModal() {
  const [, saveWelcomeShown] = useLocalStorage('welcomeShown');

  return (
    <>
      <Modal isOpen={true} placement="center" hideCloseButton>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex gap-2">
                <Image className="my-1 h-5" radius="none" src="sutra.svg" />
                <p className=" font-mono">PLAYGROUND</p>
              </ModalHeader>
              <ModalBody>
                <p className=" text-md font-bold">Welcome to SUTRA PLAYGROUND!</p>
                <p>
                  Dive into the world of AI with SUTRA PLAYGROUND, your one-stop destination for exploring ultrafast,
                  multilingual, online Generative AI models.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-blue-200"
                  onPress={() => {
                    saveWelcomeShown(true);
                  }}
                >
                  Get Started
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
