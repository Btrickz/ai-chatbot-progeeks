export const hints: Record<string, string> = {
    default: "Try thinking about what the attacker would see from this vantage point.",
    "privilege-escalation": "Look for weak service permissions, writable system files, or unquoted service paths.",
    "network": "tried using ping? :D, maybe try dhclient -r and then ping",
    "recon": "Try `nmap -sC -sV <target>` to discover open ports and services.",
    "sql-injection": "Try using `' OR '1'='1` in inputs and watch how the app responds."
  }
  