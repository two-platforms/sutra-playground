import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Link,
  Divider,
  ModalHeader,
  Card,
  CardHeader,
  CardBody,
} from '@nextui-org/react';

export default function Pricing() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Link size="sm" className=" hover:cursor-pointer" onPress={onOpen}>
        SUTRA PRICING
      </Link>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="text-xl font-bold">SUTRA PRICING</ModalHeader>
          <ModalBody className="font-mono">
            <Card>
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-lg text-blue-500">SUTRA-TURBO</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-row justify-between">
                  <div>Input (per million tokens)</div>
                  <div>$1.00</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>Output (per million tokens)</div>
                  <div>$1.00</div>
                </div>
              </CardBody>
              <Divider />
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-lg text-blue-500">SUTRA-LIGHT</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-row justify-between">
                  <div>Input (per million tokens)</div>
                  <div>$0.75</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>Output (per million tokens)</div>
                  <div>$0.75</div>
                </div>
              </CardBody>
            </Card>
            <Card className="">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-lg text-blue-500">SUTRA-ONLINE</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-row justify-between">
                  <div>Input (per million tokens)</div>
                  <div>$1.00</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>Output (per million tokens)</div>
                  <div>$1.00</div>
                </div>
              </CardBody>
              <Divider />
            </Card>
            <Card className="">
              <CardBody>
                <div className="flex w-full flex-col justify-between">
                  <div className="text-blue-500">Search Add-on</div>
                  <div>$3.00 per 1,000 requests</div>
                </div>
              </CardBody>
              <Divider />
              <CardBody>
                <div className="flex w-full flex-col justify-between">
                  <div className="text-blue-500">Language Add-on</div>
                  <div>$1.00-$2.20 per 1,000 requests</div>
                </div>
              </CardBody>
              <Divider />
              <CardBody>
                <div className="flex w-full flex-col justify-between">
                  <div className="text-blue-500">Long-Term Memory Add-on</div>
                  <div>$5.00 per 1,000 requests</div>
                </div>
              </CardBody>
              <Divider />
            </Card>
            <Link className="w-full justify-end" isExternal href="https://www.two.ai/contact">
              Contact us for quotes
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
