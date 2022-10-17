<script lang="ts">
  import Router from "svelte-spa-router";
  import NotFound from "./pages/NotFound.svelte";
  import LanguageSelection from "./pages/LanguageSelection.svelte";
  import GreetingsPage from "./pages/GreetingsPage.svelte";
  import PromptHome from "./pages/PromptHome.svelte";
  import LocationSelection from "./pages/LocationSelection.svelte";
  import CohortSelection from "./pages/CohortSelection.svelte";
  import BaseLayout from "./components/BaseLayout.svelte";
  import LanguageSelector from "./components/LanguageSelector.svelte";

  import Particles from "./components/Particles.svelte";
  import MuteSelector from "./components/MuteSelector.svelte";
  import AqiViewer from "./pages/AqiViewer.svelte";
  import FaqPage from "./pages/FaqPage.svelte";

  const routes = {
    "/": GreetingsPage,
    "/options/lang": LanguageSelection,
    "/options/location": LocationSelection,
    "/options/cohort": CohortSelection,
    "/prompt": PromptHome,
    "/prompt/faq/:id": FaqPage,
    "/prompt/aqi": AqiViewer,
    "*": NotFound,
  };
</script>

<main>
  <LanguageSelector />
  <MuteSelector />
  <Particles />
  <Router {routes} />
</main>

<style global>
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
