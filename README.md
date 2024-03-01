# WeatherApp
- [Api som används](https://open-meteo.com/en/docs/)
- Använd typescript och vue
  
## Värden vi vill ha: 
- Temperature (2 m)
- Relative Humidity (2 m)
- Apparent Temperature
- Precipitation Probability
- Precipitation (rain + showers + snow)
- Wind Speed (10 m)
- Wind Direction (10 m)
- Wind Gusts (10 m)

## Design:
tabell version  :: Utgå från klart.se
- skapa en modul?
diagram version :: Utgå från smhi
- använd canvas till att skapa diagrammet

hämta svg ikoner härifrån?:
https://www.reshot.com/free-svg-icons/arrow/

  #### Easter egg :: låtar baserat på väder?

## Uppdelning av program:
- (klass?) skapa ett sätt att bygga en api url request
  - glöm ej geocoding och translation till koordinater
- Tabellklass?
- Diagramklass
  - canvas < SVG (Svg kan vara bättre för vårat syfte samt enklare)
- Api-url builder
  - geocoding method
    - input : String -> SearchName
    - output : Long, Lat (DataObject?)
    - get data: Long, Lat, Plasename, Admin (city country)
  - GetWeatherData
      - Input : lat, long, options array?
      - out data.json 
***

# Inlämningsuppgift 4: Projekt. Lärarens instruktioner:
Skriv en fullständig applikation med Vue baserat på era egna idéer.

## Krav för G
Ni har stor frihet i hur ni utformar er applikation. Se avdelningen **Exempel** nedan för förslag som ni kan välja rakt av om ni vill.

Ni kan också ta fram en helt egen idé, men dubbelkolla då snabbt med mig antingen i klassrummet eller via Teams/Omniway så att jag kan bedöma om er idé är lämplig.

För att applikationen ska kunna få G behöver den uppfylla följande:

### Funktionalitet
- Applikationen ska vara i liknande storleksordning som TodoMVC eller aningen större.
    - Se till att inte göra den mycket större än TodoMVC, både för er egen skull och för min skull.
- Om er applikation förlitar sig på exempeldata/startdata (exempelvis en lista över länder och städer) så ska denna hämtas antingen från en separat JSON-fil eller från ett externt API.
- Undvik funktionalitet som kräver att användaren matar in en stor mängd data via flera olika formulär. Överväg istället att använda startdata som applikationen automatiskt läser in, så som nämns ovan. (Det är roligare och mer intressant att fokusera mer på funktionalitet än datainmatning.)

### Tester
- Er applikation ska innehålla minst 3 GUI-tester med Playwright (högst 10) som testar olika relevanta scenarion.

### JavaScript
- Ni ska skriva applikationen med Vue.
    - Det är tillåtet att använda React istället för Vue.
    - Det är tillåtet men frivilligt att också använda TypeScript.
    - Om ni vill använda något annat bibliotek eller ramverk än de som nämns ovan (exempelvis jQuery) så måste ni först kontakta mig och förklara vad ni vill använda och varför, och därefter få det godkänt av mig. Generellt sett godkänner jag inte extra bibliotek, men jag bedömer detta från fall till fall.

### CSS
- Ni ska skriva er CSS helt själva, utan ramverk som exempelvis Twitter Bootstrap.
- Er CSS ska vara responsiv i rimlig utsträckning. En bra utgångspunkt är att layouten ska fungera bra på en typisk mobil, surfplatta och desktop-dator.
- Ni ska ta fram er grafiska design själva men hur snygg den är påverkar inte betyget, förutsatt att designen är tydlig och använder sig av färg och/eller bakgrundsgrafik i någon utsträckning.
    - Ni får använda valfria typsnitt och bilder som ni inte har gjort själva. (Med andra ord är det just själva designen som ni måste göra själva, inte bilderna som ingår i den.) För er egen skull (om ni vill publicera den i er portfolio) rekommenderar jag att ni enbart använder typsnitt och bilder som har gratislicenser.

### HTML
- Ni ska skriva er HTML helt själva.
- Er HTML ska vara semantisk i rimlig utsträckning.

### Kodstil
- Er applikation ska ha god kodstil, inklusive bland annat:
    - Konsekvent indentering och formatering.
    - Tydliga namn på variabler och funktioner etc.
    - Tydliga kommentarer på de ställen där något behöver förtydligas.
    - En rimlig uppdelning i olika funktioner/klasser: inte all kod i en enda enorm funktion men inte heller all kod utspridd över hundra jättesmå funktioner.

### Dokumentation
- Ni ska skriva **individuell** dokumentation som besvarar följande frågor om er applikation:
    1. Vilka delar av er kod var svårast att implementera? Beskriv med tekniska detaljer och referera till relevanta delar av koden.
    2. Vilka delar av er kod är du mest nöjd med och varför? Beskriv med tekniska detaljer och referera till relevanta delar av koden.
    3. Vilka delar av er kod skulle du vilja förbättra och varför, samt hur? Beskriv med tekniska detaljer och referera till relevanta delar av koden.
- Håll er inom följande ordgräns:
    - Max 750 ord om ni enbart har gjort G-delen.
    - Max 1.500 ord om ni har gjort både G-delen och VG-delen.
- Om ni har gjort både G-delen och VG-delen, se till att er dokumentationen också innefattar både G-delen och VG-delen.

**Den skriftliga dokumentationen kommer att användas för att bedöma enskilda insatser i ert arbete och måste därför göras individuellt. Ni får diskutera ert arbete tillsammans men allting som ni skriver ner i denna del av dokumentationen måste skrivas individuellt. Ni varken får eller bör "hjälpa" er samarbetspartner genom att skriva denna del av dokumentationen tillsammans.**

### Videopresentation
Spela in en kort videopresentation som visar upp applikationens funktionalitet:

- Visa upp applikationen genom att köra den (alltså inte genom exempelvis screenshots).
- Tala också in vad som händer medan ni använder applikationen.
- Det är upp till er om båda eller bara en person talar.
- Ni kan spela in via ett samtal i Teams eller med valfri annan mjukvara.
- Längden bör vara 5 minuter eller kortare. Max 10 minuter. Så länge den visar upp all funktionalitet är den tillräckligt lång.
- Videopresentationen kommer även att delas med resten av klassen så att ni kan se vad andra har gjort och inspireras.

## Krav för VG
För att ni ska kunna få VG behöver er applikation uppfylla alla krav från G-delen samt följande:

- Användarens egna data ska sparas i [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) så att den är tillgänglig även efter att sidan laddas om.
    - Till detta räknas alltså den data som användaren själv skapar eller väljer, men inte sådan som är fördefinierad av appen.
- Applikationen ska erbjuda någon ytterligare funktionalitet som ritar upp någon form av diagram (eller annan relevant grafik). Denna funktionalitet ska använda sig av antingen [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) eller [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).
    - Vi kommer att gå igenom SVG och Canvas på översiktlig nivå under en lektion, men att via dokumentationen lära sig tillräckligt om hur dessa API:er fungerar är också en del av uppgiften på VG-nivå.
    - Observera att ni *inte* får använda bibliotek till SVG/Canvas, utan ska skriva denna kod själva (precis som resten av koden).
    - Det går också att föreslå någon annan extrafunktionalitet som använder sig av andra intressanta funktioner i webbläsaren (exempelvis [Web Speech](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)), men ni måste då i förväg beskriva ert förslag för mig och få det godkänt innan ni sätter igång. Denna funktionalitet ska vara av liknande komplexitet som att rita upp ett diagram.

## Exempel

- **Träning:** En applikation som låter användaren sätta ihop ett personligt träningsprogram utifrån en fördefinierad uppsättning övningar (armhävningar, sit-ups, etc.). Användaren kan se en sammanfattning av exempelvis hur lång tid träningsprogrammet tar att utföra eller hur många kalorier det bränner.

- **Recept:** En applikation som låter användaren sätta ihop en flerrättersmiddag (exempelvis förrätt, huvudrätt, efterrätt) utifrån en fördefinierad uppsättning recept. Användaren kan se en sammanfattning av exempelvis det totala näringsvärdet av middagen eller en sammanslagen inköpslista på ingredienserna i recepten.

- **Budget:** En applikation som låter användaren mata in utgifter och ange belopp, datum och kategori på dem. Användaren kan se en sammanfattning av exempelvis totala utgifter per månad, per kategori, etc.

## Samarbete
Denna inlämningsuppgift ska utföras och lämnas in i par, dock med en individuell del i form av dokumentationen.

## Betygsättning
Möjliga betyg: VG, G och IG.

Betygsättningen är en helhetsbedömning utifrån dels hur väl er applikation uppfyller kraven och dels hur välskriven, välstrukturerad och väldokumenterad er kod är.

## Inlämning
1. Formatera och indentera er kod (HTML, CSS, JavaScript) på ett korrekt sätt, exempelvis med kommandot `Format Document` (`Shift+Alt+F`) i Visual Studio Code.
    - Om koden inte är korrekt formaterad och indenterad så kommer jag att be om komplettering utan att bedöma resten av er inlämning.
2. Lämna in följande **individuellt** via Omniway:
    1. Länk till applikationen på GitHub Pages. (Enbart en person i gruppen behöver lämna in detta.)
    2. ZIP-arkiv med samtliga filer. (Enbart en person i gruppen behöver lämna in detta.)
        - Kom ihåg Playwright-testerna.
        - Om ni använder er av TypeScript eller funktionalitet i Vue som kräver kompilering (exempelvis [single file components](https://v3.vuejs.org/guide/single-file-component.html)) så måste ni lämna in både källkoden **och** den kompilerade koden så att jag kan öppna er applikation direkt utan att använda mig av Node.js eller andra verktyg.
    3. Videopresentation av er applikation, i MP4-format. (Enbart en person i gruppen behöver lämna in detta.)
    4. PDF-dokument med din individuella dokumentation.

