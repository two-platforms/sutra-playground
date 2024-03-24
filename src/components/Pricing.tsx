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
          <ModalBody>
            <Card className="">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-lg">SUTRA Light</p>
                  <p className="font-mono text-small text-blue-500">SUTRA-50B-ML</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-row justify-between">
                  <div>Input (per Million Tokens)</div>
                  <div>$0.75</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>Output (per Million Tokens)</div>
                  <div>$0.75</div>
                </div>
              </CardBody>
            </Card>
            <Card className="">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-lg">SUTRA Online</p>
                  <p className="font-mono text-small text-blue-500">SUTRA-50B-ML</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-row justify-between">
                  <div>Input (per Million Tokens)</div>
                  <div>$1.00</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>Output (per Million Tokens)</div>
                  <div>$1.00</div>
                </div>
              </CardBody>
              <Divider />
            </Card>
            <Card className="">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-lg">Add-on</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex w-full flex-col justify-between">
                  <div>Search Add-on</div>
                  <div>$3.00 per 1,000 requests</div>
                </div>
              </CardBody>
              <Divider />
              <CardBody>
                <div className="flex w-full flex-col justify-between">
                  <div>Language Add-on</div>
                  <div>$1.00-$2.20 per 1,000 requests</div>
                </div>
              </CardBody>
              <Divider />
              <CardBody>
                <div className="flex w-full flex-col justify-between">
                  <div>Long-Term Memory Add-on</div>
                  <div>$5 per 1,000 requests</div>
                </div>
              </CardBody>
              <Divider />
            </Card>
            <Link className="w-full justify-end" isExternal href="https://www.two.ai/contact">
              Contact us for more information
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
