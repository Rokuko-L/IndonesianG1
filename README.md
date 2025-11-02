# Indonesian G1 Horse Racing Archive

A searchable database of Indonesia's most prestigious horse races: Indonesian Derby, Super Sprint, and Stars of Stars.

## About

This project archives historical race results that were previously scattered across Facebook posts, YouTube videos, and old race programs. Now searchable, sortable, and accessible.

## Features

- 🔍 Search across all fields (horse, jockey, trainer, owner, etc.)
- 📊 Sortable columns
- 🌓 Dark/Light mode
- 🌏 English/Indonesian language support (BROKEN, Sorry!)
- 📱 Responsive design
- 🔗 Direct links to Studbook Indonesia profiles

## Data Structure

Each race record includes:
- Number
- Year
- Venue
- Length (distance)
- Horse Name (with Studbook link)
- Recorded Time
- Province
- Jockey
- Trainer
- Owner
- Breeder

## Contributing

### Missing Data
If you have historical race data, especially:
- Recorded times
- Pre-2000s results
- Missing breeder information

Please open an issue or contact me.

### Adding Data
Race data is stored in JSON files under `/data/`:
- `indonesian-derby.json`
- `super-sprint.json`
- `stars-of-stars.json`

Format:
```json
{
  "number": 1,
  "year": 2023,
  "venue": "Jakarta Race Course",
  "length": "2000m",
  "name": "Horse Name",
  "time": "2:05.4",
  "province": "Jakarta",
  "jockey": "Jockey Name",
  "trainer": "Trainer Name",
  "owner": "Owner Name",
  "breeder": "Breeder Name"
}
```

### Pull Requests
1. Fork the repo
2. Add/update data in the appropriate JSON file
3. Submit a pull request with a clear description

## Data Sources
- Youtube race programs (BAHARNA TV publications)
- Public racing records
- Community contributions

## License
Data compiled for archival and educational purposes. Not affiliated with any official racing organization.

## Contact
- Twitter: [@dhafin_wey](https://x.com/dhafin_wey)
- Issues: [GitHub Issues](https://github.com/Rokuko-L/IndonesianG1/issues)
