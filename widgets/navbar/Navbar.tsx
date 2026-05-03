import { LanguageSelect } from "@/widgets/language-select/LanguageSelect";
import { NavbarLinks } from "@/widgets/navbar/NavbarLinks/NavbarLinks";
import { ThemeSwitch } from "@/widgets/theme-switcher/ThemeSwitcher";
import { GlassSurface } from "@/shared/ui/GlassSurface/GlassSurface";
import { Socials } from "@/widgets/socials/Socials";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <GlassSurface className={styles.socialsWrapper} overflowVisible>
        <Socials />
      </GlassSurface>

      <GlassSurface className={styles.navbarLinksWrapper} overflowVisible>
        <NavbarLinks />
      </GlassSurface>

      <GlassSurface className={styles.themeSwitcherWrapper}>
        <ThemeSwitch />
      </GlassSurface>

      <GlassSurface className={styles.languageSelectWrapper}>
        <LanguageSelect />
      </GlassSurface>
    </nav>
  );
};
