import { Divider, Image, Link, Radio, RadioGroup, Select, SelectItem, Switch } from '@nextui-org/react';
import packageJson from '../../package.json';
import { OTHER_MODELS, SUTRA_MODELS, SutraModel } from '../service/SutraModels';
import { useAtom } from 'jotai';
import {
  agentInfoAtom,
  compareDUOAtom,
  otherMaxTokensAtom,
  otherModelAtom,
  otherTemperatureAtom,
  searchLocationAtom,
  serviceURLAtom,
  sutraMaxTokensAtom,
  sutraModelAtom,
  sutraTemperatureAtom,
} from '../state/atoms';
import { SignOutButton } from '@clerk/clerk-react';
import { IPv4, Location } from './GeoInfo';
import Ping from './Ping';
import { K } from '../utils/K';
import { SEARCH_LOCATIONS, SearchLocation } from '../service/SearchLocations';
import Pricing from './Pricing';

export const MenuLeftView = () => {
  const [sutraModel, setSutraModel] = useAtom(sutraModelAtom);
  const [otherModel, setOtherModel] = useAtom(otherModelAtom);
  const [sutraTemperature, setSutraTemperature] = useAtom(sutraTemperatureAtom);
  const [sutraMaxTokens, setSutraMaxTokens] = useAtom(sutraMaxTokensAtom);
  const [compareDUO, setCompareDUO] = useAtom(compareDUOAtom);
  const [otherTemperature, setOtherTemperature] = useAtom(otherTemperatureAtom);
  const [otherMaxTokens, setOtherMaxTokens] = useAtom(otherMaxTokensAtom);
  const [, setServiceURL] = useAtom(serviceURLAtom);
  const [searchLocation, setSearchLocation] = useAtom(searchLocationAtom);

  const changeSutra = (newModel: SutraModel): void => {
    sutraModel.temperature = sutraTemperature;
    sutraModel.maxTokens = sutraMaxTokens;
    setSutraTemperature(newModel.temperature);
    setSutraMaxTokens(newModel.maxTokens);
    setSutraModel(newModel);
  };

  const changeOther = (newModel: SutraModel): void => {
    otherModel.temperature = otherTemperature;
    otherModel.maxTokens = otherMaxTokens;
    setOtherTemperature(newModel.temperature);
    setOtherMaxTokens(newModel.maxTokens);
    setOtherModel(newModel);
  };

  const changeSearchLocation = (newLocation: SearchLocation): void => {
    setSearchLocation(newLocation);
  };

  return (
    <div className="sticky top-0 flex h-screen min-w-64 flex-col gap-4 p-4">
      {/* SELECTS */}
      <>
        <div className="flex flex-col items-start gap-0 font-mono text-sm">
          <Image className="h-8" src="Sutra-Logo.svg" />
          <div className="pl-1 text-xs font-bold">PLAYGROUND {packageJson.version}</div>
        </div>

        <Divider />
        {/* Sutra model selection */}
        <Select
          aria-label="Select Sutra Model"
          placeholder="Select Sutra Model"
          labelPlacement="inside"
          label="Select Sutra Model"
          selectedKeys={[sutraModel.displayName]}
          renderValue={() => {
            return (
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="font-semibold">{sutraModel.displayName}</span>
                </div>
              </div>
            );
          }}
        >
          {SUTRA_MODELS.map((m) => (
            <SelectItem key={m.displayName} textValue={m.displayName} onClick={() => changeSutra(m)}>
              <div className="flex flex-col">
                <span className="">{m.displayName}</span>
              </div>
            </SelectItem>
          ))}
        </Select>

        {/* SWITCHES */}
        <>
          <Switch isSelected={compareDUO} size="sm" onChange={() => setCompareDUO(!compareDUO)}>
            Compare Mode
          </Switch>
        </>

        {/* Sutra model selection  */}
        {compareDUO && (
          <Select
            aria-label="Select Other Model"
            placeholder="Select Other Model"
            labelPlacement="inside"
            label="Select Other Model"
            selectedKeys={[otherModel.displayName]}
            renderValue={() => {
              return (
                <div className="flex flex-row">
                  <span className="font-semibold">{otherModel.displayName}</span>
                </div>
              );
            }}
          >
            {OTHER_MODELS.map((m) => (
              <SelectItem key={m.displayName} textValue={m.displayName} onClick={() => changeOther(m)}>
                <div className="flex flex-col">
                  <span className="">{m.displayName}</span>
                </div>
              </SelectItem>
            ))}
          </Select>
        )}
      </>

      <Divider />
      <div className="absolute bottom-0 left-0 flex w-full flex-col items-start gap-0 p-4 font-mono text-sm">
        {/* <Image className="h-8" src="sutra.svg" />
    <div className="font-bold">PLAYGROUND {packageJson.version}</div> */}
        <SignOutButton>
          <Link size="sm" className="hover:cursor-pointer">
            SIGN OUT
          </Link>
        </SignOutButton>
        <Divider className="my-2" />
        <div>
          {agentInfoAtom.os.name.toUpperCase()} | {agentInfoAtom.browser.name.toUpperCase()}
        </div>
        <div>
          <Location />
        </div>
        <div>
          <IPv4 />
        </div>
        <Divider className="my-2" />
        <div>
          <Ping />
        </div>
        <Divider className="my-2" />
        <RadioGroup label="SUTRA SERVER" orientation="horizontal" size="sm" defaultValue="US">
          <Radio value="US" onClick={() => setServiceURL(K.SUTRA_SERVICE_US)}>
            US
          </Radio>
          <Radio value="IN" onClick={() => setServiceURL(K.SUTRA_SERVICE_IN)}>
            IN
          </Radio>
          <Radio value="KR" onClick={() => setServiceURL(K.SUTRA_SERVICE_KR)}>
            KR
          </Radio>
        </RadioGroup>
        {sutraModel.modelId == 'sutra-online' && (
          <Select
            variant="underlined"
            aria-label="User Location"
            placeholder="User Location"
            labelPlacement="inside"
            label="USER LOCATION"
            selectedKeys={[searchLocation.displayName]}
            renderValue={() => {
              return (
                <div className="flex flex-col">
                  <span className="text-small">{searchLocation.displayName}</span>
                </div>
              );
            }}
          >
            {SEARCH_LOCATIONS.map((loc) => (
              <SelectItem key={loc.displayName} textValue={loc.displayName} onClick={() => changeSearchLocation(loc)}>
                <div className="flex flex-col">
                  <span>{loc.displayName}</span>
                </div>
              </SelectItem>
            ))}
          </Select>
        )}
        <Divider className="my-2" />
        <Link isExternal showAnchorIcon size="sm" href="https://docs.two.ai">
          SUTRA API
        </Link>
        <Pricing />
        <div>© 2024 TWO.</div>
      </div>
    </div>
  );
};
