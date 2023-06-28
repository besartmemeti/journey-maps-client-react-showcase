import "@sbb-esta/journey-maps/web-component";
import "@sbb-esta/journey-maps/web-component/styles.css";
import { SbbJourneyMaps } from "@sbb-esta/journey-maps/web-component";
import "./App.css";
import { useEffect, useRef } from "react";

function App() {
  const map = useRef<(HTMLDivElement & SbbJourneyMaps) | null>(null);
  let originalMap: SbbJourneyMaps | null = null;

  useEffect(() => {
    let client = document.createElement(
      "sbb-journey-maps-wc"
    ) as SbbJourneyMaps & HTMLElement;
    client.language = "en";
    client.apiKey = "4a6dca7396895a262d76584d7b203f8e";
    client.className = "map";

    client.poiOptions = {
      categories: ["bike_sharing"],
    };

    client.listenerOptions = {
      POI: {
        selectionMode: "single",
        watch: true,
        clickTemplate: "myTemplate",
        popup: false,
      },
    };

    map.current?.appendChild(client);

    originalMap = client;

    return () => {
      map.current?.removeChild(client);
    };
  }, []);

  const onClick = () => {
    map.current?.moveNorth();
    // map.current?.moveNorth(); -> doesn't work for me
  };

  return (
    <div>
      <div className="container" ref={map} />
      <template id="myTemplate">
        <div>Hello World</div>
      </template>
      <button onClick={onClick}>Close</button>
    </div>
  );
}

export default App;
