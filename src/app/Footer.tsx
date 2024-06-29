import { SOCIALMEDIA_ITEMS } from "@/utils/globals";
import { Link } from "../navigation";

function Footer() {
  return (
    <footer className="flex w-full select-none flex-col items-center gap-2 p-4 pb-1 text-white/60 shadow-lg shadow-black/70">
      <ul className="flex gap-4 pt-4" role="list">
        {SOCIALMEDIA_ITEMS.map((item, i) => (
          <li
            key={item.href + i}
            className="transition-all duration-300 hover:-translate-y-[2px]"
          >
            <Link href={item.href} title={item.title} target="_blank">
              <item.icon />
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-center text-xs">
        {new Date().getFullYear()}© jackdahaus
      </p>
    </footer>
  );
}
export default Footer;
