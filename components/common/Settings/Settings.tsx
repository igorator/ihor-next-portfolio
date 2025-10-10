import styles from "./Settings.module.css";
import { ThemeSwitch } from "./ThemeSwitcher/ThemeSwitcher";
import { LanguageSelect } from "./LanguageSelect/LanguageSelect";

export const Settings = () => {
  return (
    <div className={styles.settings}>
      <ThemeSwitch />
      <LanguageSelect />
    </div>
  );
};
