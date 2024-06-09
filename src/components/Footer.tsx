import { createClient } from "@/prismicio";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer>
      <Link href="/">{settings.data.site_title}</Link>
      <p>
        <sup>©</sup>
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
