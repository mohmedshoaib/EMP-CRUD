import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faPenToSquare,
  faTrash,
  faUserPlus,
  faHouse,
  faRectangleList,
  faWallet,
  faRectangleXmark,
  faBars,
  faXmark,
  faDownload,
  faFileImport,
  faGauge,
  faSitemap,
  faUser,
  faArrowLeft,
  faArrowDown,
  faCoins,
  faGear,
  faRightFromBracket,
  faSnowflake,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

export const edit = (
  <FontAwesomeIcon
    icon={faPenToSquare}
    size="xl"
    style={{ color: "#002B5B" }}
  />
);
export const del = (
  <FontAwesomeIcon icon={faTrash} size="xl" style={{ color: "red" }} />
);
export const addEmp = <FontAwesomeIcon icon={faUserPlus} size="lg" />;
export const home = <FontAwesomeIcon icon={faHouse} size="lg" />;
export const grid = <FontAwesomeIcon icon={faCoffee} size="sm" />;
export const allEmp = <FontAwesomeIcon icon={faRectangleList} size="lg" />;
export const close = (
  <FontAwesomeIcon
    icon={faRectangleXmark}
    size="2xl"
    style={{
      "--fa-primary-color": "#436193",
      "--fa-secondary-color": "#7b8493",
    }}
  />
);
export const addSal = (<FontAwesomeIcon icon={faCoins} size="xl" style={{color: "#063f81"}}/>);
export const bar = (<FontAwesomeIcon icon={faBars} size="xl" />)
export const x_mark = (<FontAwesomeIcon icon={faXmark} size="2xl" />)
export const x_mark_1 = (<FontAwesomeIcon icon={faXmark} size="xl"/>)
export const expt = (<FontAwesomeIcon icon={faDownload} />)
export const impt = (<FontAwesomeIcon icon={faFileImport} />)
export const dash = (<FontAwesomeIcon icon={faGauge} />)
export const proj = (<FontAwesomeIcon icon={faSitemap} />)
export const emp = (<FontAwesomeIcon icon={faUser} />)
export const lef = (<FontAwesomeIcon icon={faArrowLeft} />)
export const dow = (<FontAwesomeIcon icon={faArrowDown} />)
export const ico = (<FontAwesomeIcon icon={faSnowflake} size="xs" />)
export const sett = (<FontAwesomeIcon icon={faGear} />)
export const log = (<FontAwesomeIcon icon={faRightFromBracket} />)
export const plus = (<FontAwesomeIcon icon={faPlus} />)